---
layout: page
title: bandicoot - downloads
---

## Latest Binaries

Bandicoot v6-rc is the latest release candidate released on Nov 30 2012.

<table>
<thead>
    <th>Platform</th>
    <th>Size</th>
    <th>MD5</th>
</thead>
<tr>
    <td><a href="download/linux/amd64/bandicoot-v6-rc.tar.gz">linux/amd64</a></td>
    <td>186KB</td>
    <td>f20882be5a41140646d9fd7abbaed44b</td>
</tr>
<tr>
    <td><a href="download/linux/i386/bandicoot-v6-rc.tar.gz">linux/i386</a></td>
    <td>169KB</td>
    <td>526a366e5a64ed6d50b315a6a96700db</td>
</tr>
<tr>
    <td><a href="download/mac-os/amd64/bandicoot-v6-rc.tar.gz">mac-os/amd64</a></td>
    <td>88KB</td>
    <td>fd00176d6752cf89d682486f291be795</td>
</tr>
<tr>
    <td><a href="download/mac-os/i386/bandicoot-v6-rc.tar.gz">mac-os/i386</a></td>
    <td>83KB</td>
    <td>04882469df1cb820b599a6bfa38a341e</td>
</tr>
</table>

## Stable Binaries

Bandicoot v5 is the stable version released on May 21 2012.

<table>
<thead>
    <th>Platform</th>
    <th>Size</th>
    <th>MD5</th>
</thead>
<tr>
    <td><a href="download/linux/amd64/bandicoot-v5.tar.gz">linux/amd64</a></td>
    <td>169K</td>
    <td>b30b7f99c4c3ece5b8eafee1d93398c7</td>
</tr>
<tr>
    <td><a href="download/linux/i386/bandicoot-v5.tar.gz">linux/i386</a></td>
    <td>154K</td>
    <td>7747c659d667495b788e2dda53ebec85</td>
</tr>
<tr>
    <td><a href="download/mac-os/amd64/bandicoot-v5.tar.gz">mac-os/amd64</a></td>
    <td>81K</td>
    <td>c3d52d313b5b7837e6e4f83d0136ec4c</td>
</tr>
<tr>
    <td><a href="download/mac-os/i386/bandicoot-v5.tar.gz">mac-os/i386</a></td>
    <td>75K</td>
    <td>288a40d776bdeda259d39c3eaa565264</td>
</tr>
<tr>
    <td><a href="download/windows/i386/bandicoot-v5.tar.gz">windows/i386</a></td>
    <td>198K</td>
    <td>2ae0b1e14dcbc05459b120f63eb64520</td>
</tr>
</table>

## Building from Source

You will need the following to build your own Bandicoot:
* a UNIX or a Windows system (ILP32 or LP64)
* C99 compliant compiler
* standard C library
* parser generator (bison or byacc)
* lexical analyzer generator (lex or flex)
* cURL
* sed
* git

Once the tools are installed (e.g. via XCode on Mac or &quot;apt-get install
gcc libc-dev bison flex sed curl git-core&quot; on Debian), you can proceed
with the following commands.

Getting the sources and building the system:
{% highlight bash %}
$ git clone https://github.com/bandilab/bandicoot.git
$ cd bandicoot
$ ./ctl dist -m64 # or with -m32 for 32-bit architectures
{% endhighlight %}

Running the test cases:
{% highlight bash %}
$ ./ctl pack
$ ./ctl test
{% endhighlight %}

Contributing:
{% highlight bash %}
$ ./ctl todos
$ lynx http://groups.google.com/group/bandicoot
{% endhighlight %}
