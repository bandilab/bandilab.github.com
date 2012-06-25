---
layout: page
title: bandicoot - having fun with structured data
---

Bandicoot is a programming system with a new set-based programming language,
persistency capabilities, and run-time environment. The language is similar to
general purpose programming languages where you write functions/methods and
access data through variables. Though, in Bandicoot, you always manipulate data
in sets using a small set-based algebra (the [relational
algebra](http://bandilab.org/bandicoot-algebra.pdf). Here is a small program
which manages your book shelf:

    type Books {
        title string,
        pages int,
        price real,
    }
    
    var shelf Books;
    
    fn List() Books
    {
        return shelf;
    }
    
    fn Append(b Books) void
    {
        shelf += b;
    }

Here are some of the features:
* native support for set-based programming using the relational algebra
* simple syntax for common set-operators: &quot;+&quot; (union), &quot;-&quot; (minus), etc.
* all functions are automatically exposed via HTTP, e.g. /List, /Append
* supports persistency via global variables (with transactions and ACID)
* can run on multiple computers in a distributed mode
* small binary ~100KB
