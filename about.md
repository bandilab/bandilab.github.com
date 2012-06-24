---
layout: page
title: bandicoot - about
---

Bandicoot is a community project established by Ostap Cherkashin and Julius
Chrobak with the following goals:

* collaboratively develop the Bandicoot system under the terms of
  [Apache License](http://www.apache.org/licenses/LICENSE-2.0.txt)
* promote the relational model (more than any other SQL-like databases do)
* make the development process with relational databases fun and efficient

The main goals of the Bandicoot system are:
* efficient implementation of the relational algebra
* clean language for programmers (rather than "English speakers")
* easy to understand transactions
* open interface
* small code base

## Acknowledgements

Bandicoot would not be possible without the work of
[E.F. Codd](http://en.wikipedia.org/wiki/Edgar_F._Codd) on the relational
model. We strongly recommend everyone to read his
[paper] (http://www.seas.upenn.edu/~zives/03f/cis550/codd.pdf).
[C.J. Date] (http://en.wikipedia.org/wiki/Christopher_J._Date) has written
a book which influenced the creation of the Bandicoot. The system is based
on the evolution of some of the ideas mentioned in the &quot;Database in
Depth&quot;.

## Contribute

{% highlight bash %}
$ git clone https://github.com/bandilab/bandicoot.git
$ cd bandicoot
$ ./ctl todos
{% endhighlight %}

This will print the list of small things to work on. If you have a patch you can
submit it to `hackers at bandilab dot org`. Also, join our
[Google Group](http://groups.google.com/group/bandicoot).
