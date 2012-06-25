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

fn Fiction(b Books) Books
{
	return (select genre == "Fiction" b);
}

fn FictionPrice(b Books) {avgPrice real}
{
	var res = summary avgPrice = (avg price 0.0) (select genre == "Fiction" b);

	return res;
}

var books Books;

fn Write(b Books) void
{
	books = b;
}

fn Prices() {title string, price real}
{
	return books;
}

fn Titles() {title string}
{
	return books;
}

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
