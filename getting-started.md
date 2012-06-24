---
layout: page
title: bandicoot - getting started
---

## Start Up

    $ tar xvfz bandicoot-v5.tar.gz
    $ cd bandicoot-v5/examples
    $ mkdir volume
    $ ./bandicoot start -p 12345 -c program.b -d volume -s tx.state

To stop Bandicoot simply kill it or press CTRL-C in the terminal. All
in-progress transactions will be rolled back automatically.

## Programs

Bandicoot programs are defined in text files similar to other programming
languages (e.g. C, Java). Conventional file suffix is `.b`. The
programs are written in <b>Bandicoot language</b> and they define types,
variables, and functions. Here is an example which defines type Books and
function Echo:

    type Books {
       title string,
       genre string,
       price real,
       pages int
    }
    
    fn Echo(b Books) Books
    {
        return b;
    }

## API

Every function is automatically exposed via HTTP. For example the Echo function
declared above will have the following URL:
`http://localhost:12345/Echo`. If a function takes a relational parameter,
it needs to be called with the HTTP POST method. Otherwise, the HTTP GET method
is required.

Bandicoot uses a CSV (Comma Separated Values) format to exchange the data.
The first line defines the attributes of a relation and the remaining lines contain
values (tuples).

    $ cat one.csv
    title string,pages int,price real,genre string
    Robinson Crusoe,312,11.21,Novel
 
    $ curl --data-binary @one.csv http://localhost:12345/Echo
    genre string,pages int,price real,title string
    Novel,312,11.21,Robinson Crusoe

N.B.: examples use the curl command line utility from a terminal window
(--data-binary @file is the syntax for submitting a file via HTTP POST).
Obviously, you can use any other tools and libraries which support HTTP/1.1
(unfortunately, the wget tool supports only HTTP/1.0 and hence it does not
work with Bandicoot).

## No Duplicates, No Order

The Echo function removes duplicate tuples. The reason is due to the nature
of Relation. Relations are mathematical sets of tuples and do not allow
duplicates. Moreover, keep in mind that sets do not have order and hence the
tuples can be returned in a different order:

    $ cat duplicate.csv
    title string,pages int,price real,genre string
    Oliver Twist,608,12.99,Fiction
    Robinson Crusoe,312,11.21,Novel
    Robinson Crusoe,312,11.21,Novel
 
    $ curl --data-binary @duplicate.csv http://localhost:12345/Echo
    genre string,pages int,price real,title string
    Novel,312,11.21,Robinson Crusoe
    Fiction,608,12.99,Oliver Twist

## Data Manipulation

Bandicoot defines 8 relational operators: rename, project, extend, select,
union, join, minus, and summary (see the [specification](specification.html)
page or a relational algebra [diagram](bandicoot-algebra.pdf) for details).

The operators take one or more relations as input, perform a specific action,
and return a new relation as output. This principle allows chaining the
operators in a single statement to perform multiple actions.

Functions are the primary means of accessing and changing data in Bandicoot.
If you do complex calculations and you wish to reuse the results within a
function, you can use _temporary variables_. The type of a temporary variable
is determined from the value assigned to it and the value is immutable.

    # selects fiction books from the input
    fn Fiction(b Books) Books
    {
        return select genre == "Fiction" b;
    }
    
    # calculates an average price of fiction books
    fn FictionPrice(b Books) {avgPrice real}
    {
        # use of a temporary variable and a chained statement
        var res = summary avgPrice = (avg price 0.0)
                          (select genre == "Fiction" b);
    
        return res;
    }

Test:

    $ cat books.csv
    title string,pages int,price real,genre string
    The Iliad,576,26.40,Poetry
    The Odyssey,416,19.95,Poetry
    Oliver Twist,608,12.99,Fiction

    $ curl --data-binary @books.csv http://localhost:12345/Fiction
    genre string,pages int,price real,title string
    Fiction,608,12.99,Oliver Twist

    $ curl --data-binary @books.csv http://localhost:12345/FictionPrice
    avgPrice real
    12.99

## Data Persistence

Bandicoot provides data persistence automatically and transparently by using
_global variables_. They keep the data among different invocations of functions
and Bandicoot restarts. The variables are saved to a directory specified as
`-d` parameter during start up.

The global variables are always modified within a transaction. If a function
modifies one ore more global variables the new content becomes available after
the function executes successfully. In case of an error the changes are rolled
back immediately.

    var books Books;
    
    fn Write(b Books) void
    {
        books = b;
    }
    
    fn Titles() {title string}
    {
        return books;
    }

Test:

    $ curl --data-binary @books.csv http://localhost:12345/Write

    $ curl http://localhost:12345/Titles
    title string
    The Iliad
    The Odyssey
    Oliver Twist

N.B: there are some limitations while working with global variables:
* only one assignment per variable is possible within a function
* once assigned, the new value cannot be read. If it is required to reuse the
  value, you can use temporary variables which allow multiple reads.

## Insert, Update, and Delete

Bandicoot has one approach for changing the data: assignment. This means that
there is no separate insert, update or delete operator and all these actions
are implemented via assignment.

Adding of new tuples to an existing set is achieved with the help of the union
operator (`+` symbol). The union merges two sets of tuples together
and removes any duplicate entries.

Updates are implemented with the help of the extend operator. Once the data
set has been extended, you need to replace the existing attribute with a new
one.

In case of a delete there are several options how to remove the desired set
of tuples from relational variable. The DeleteFiction function defined
below removes all the tuples which do not match to the given boolean expression.

    fn AddBooks(b Books) void
    {
        books = books + b;
    }
    
    fn UpdatePrice() void
    {
        books = rename price = reduced
                       (project title, genre, pages, reduced
                                (extend reduced = price * 0.90 books));
    }
    
    fn DeleteFiction() void
    {
        books = select genre != "Fiction" books;
    }

Insert test:

    $ curl http://localhost:12345/Titles
    title string
    The Iliad
    The Odyssey
    Oliver Twist

    $ cat more-books.csv
    title string,pages int,price real,genre string
    Oliver Twist,608,12.99,Fiction
    Grimm's Fairy Stories,560,14.50,Fairy tales

    $ curl --data-binary @more-books.csv http://localhost:12345/AddBooks

    $ curl http://localhost:12345/Titles
    title string
    The Iliad
    The Odyssey
    Oliver Twist
    Grimm's Fairy Stories

Update test:

    $ curl http://localhost:12345/Prices
    price real,title string
    26.4,The Iliad
    19.95,The Odyssey
    12.99,Oliver Twist
    14.5,Grimm's Fairy Stories

    $ curl http://localhost:12345/UpdatePrice

    $ curl http://localhost:12345/Prices
    price real,title string
    23.76,The Iliad
    17.955,The Odyssey
    11.691,Oliver Twist
    13.05,Grimm's Fairy Stories

Delete test:

    $ curl http://localhost:12345/Titles
    title string
    The Iliad
    The Odyssey
    Oliver Twist
    Grimm's Fairy Stories

    $ curl http://localhost:12345/DeleteFiction

    $ curl http://localhost:12345/Titles
    title string
    The Iliad
    The Odyssey
    Grimm's Fairy Stories

Now you know enough to start writing your own Bandicoot applications. If you
are thinking of using Bandicoot with the JavaScript, you can find some useful
information on the [webapps](webapps.html) page.
