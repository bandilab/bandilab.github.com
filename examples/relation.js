function Rel(csv) {
    this.lines = split(csv, "\n");
    this.head = new Head(this.lines[0]);
    this.pos = 1;

    this.next = function(returnTupleAsArray) {
        if (this.pos >= this.lines.length || this.lines[this.pos] == "")
            return null;

        var attrs = split(this.lines[this.pos], ",");
        if (attrs.length != this.head.len)
            throw "bad tuple [" + this.lines[this.pos] + "]";

        this.pos++;

        var res = attrs;
        if (returnTupleAsArray === undefined) {
            res = [];
            for (var i = 0; i < attrs.length; ++i)
                res[this.head.names[i]] = attrs[i];
        }

        return res;
    }

    this.reset = function() {
        this.pos = 1;
    }

    this.count = function() {
        return this.lines.length - 1;
    }
}

function Head(line) {
    var namesTypes = split(line, ",");

    this.len = namesTypes.length;
    this.attrs = [];
    this.names = [];

    for (var i = 0; i < this.len; ++i) {
        var nt = split(namesTypes[i], " ");
        if (nt.length != 2)
            throw "bad head attribute [" + namesTypes[i] + "]";

        this.attrs[nt[0]] = nt[1];
        this.names[i] = nt[0];
    }
}

function split(data, delim) {
    var res = [], line = [];
    var esc = "\\", prev = " ";
    var len = data.length;
    var parts = 0, idx = 0;

    for (var i = 0; i < len; ++i) {
        var c = data.charAt(i);

        if (c != delim || prev == esc)
            line[idx++] = c;

        if ((c == delim && (prev != esc)) || (i + 1) == len) {
            res[parts++] = line.join("");
            line = [];
            idx = 0;
        }

        prev = (prev == esc) ? " " : c;
    }

    return res;
}
