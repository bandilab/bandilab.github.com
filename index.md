---
layout: page
title: bandicoot - having fun with structured data
---

Bandicoot is an open source programming system with a new set-based programming language, persistency capabilities, and run-time environment. The language is similar to general purpose programming languages where you write functions/methods and access data through variables. Though, in Bandicoot, you always manipulate data in sets using a small set-based algebra (the [relational algebra](http://bandilab.org/bandicoot-algebra.pdf)).

<select id="examplemenu" onChange="changeExample()">
    <option value="readwrite">Simple read and write</option>
    <option value="function">Calling a function</option>
    <option value="operators">Using a local variable</option>
</select>

<pre id="example">
type Books {
    title string,
    pages int,
    price real,
}

var shelf Books;

fn List() Books {
    return shelf;
}

fn Append(b Books) void {
    shelf += b;
}
</pre>

Here are the main features:
* functions are automatically exposed via HTTP using CSV for data, e.g. /List, /Append
* supports persistency via global variables (with transactions and ACID)
* can run on multiple computers to scale up the read throughput
* built in operators from the relational algebra with a simple syntax, e.g. &quot;+&quot; (union), &quot;-&quot; (minus)
* small binary ~100KB

[Learn More](getting-started.html)
