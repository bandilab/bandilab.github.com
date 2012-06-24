---
layout: page
title: bandicoot - webapps
---

Connect your browser directly to the Bandicoot! Here you will find
instructions on how to make it and a public domain JavaScript API. If
something is not entirely clear below refer to the
[getting started](getting-started.html) or
[specification](specification.html) pages.

All of the examples/files mentioned below are packed together with the
Bandicoot [binaries](download.html). If you build the system from Git you
will need to download the examples as a separate
[package](examples.tgz).

## Basics

Returning unique integer numbers (refer to the unique.html and unique.b
in the examples package).

    fn Unique(vals {x int}) {x int}
    {
        return vals;
    }

This function is exposed via the following URL: `http://host:port/Unique`.
To call it from the JavaScript you can issue an HTTP POST using the
XMLHttpRequest object available in most browsers these days. Here is the
JavaScript fragment from the unique.html which executes the Unique function
with the hard-coded input parameters (the csv variable).

{% highlight javascript %}
var csv = "x int\n1\n2\n1\n2\n3";

var req = new XMLHttpRequest();
req.open("POST", "http://localhost:12345/Unique", false);
req.send(csv);

if (req.status == 200)
    confirm(req.responseText);
else
    throw "status: " + req.status;
{% endhighlight %}

Bandicoot supports the Cross-Origin Resource Sharing (CORS) specification
which makes it easy to develop your web applications on a local computer. You
will need a modern web browser such as Firefox 3.5, Safari 3, or Google
Chrome. If you cannot install one of these browsers you can setup an HTTP
server and configure a proxy so that both the web page and the Bandicoot are
available via a single domain.

## relation.js

For a more sophisticated program you will need some facility which can
parse the Bandicoot output (CSV). We have created an API which you can use
in your applications:

* construct a new Rel object from the Bandicoot output:
<pre>var rel = new Rel("greeting string\nHello!\nBonjour!\nGruezi!");</pre>
* get the next tuple (returns a map of attribute names to values):
<pre>for (var tuple = rel.next(); tuple != null; tuple = rel.next())
    alert(tuple["greeting"]);</pre>
* reset the object so that you can iterate through the tuples again:
<pre>rel.reset();</pre>
* get the values based on the index (you can pass any argument to the next call)
<pre>for (var tuple = rel.next(1); tuple != null; tuple = rel.next(1))
    alert(tuple[0]);</pre>

Here is the relation.js:
{% highlight javascript %}
{% include relation.js %}
{% endhighlight %}

For a complete example see total.html and total.b. The program dynamically
constructs a request from the input fields, then calls the Total function,
and finally parses the output with the relation.js facility and displays the
results.
