var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function $(id) {
    return document.getElementById(id);
}

function call(type, service, data) {
    var req = new XMLHttpRequest();
    req.open(type, "/bandicoot/" + service, false);
    if (data !== undefined)
        req.send(data);
    else
        req.send(null);

    if (req.status != 200)
        throw "status: " + req.status;

    if (req.responseText != "")
        return new Rel(req.responseText);
    else
        return null;
}

function pad(num) {
    var res = "" + num;
    if (num < 10)
        res = "0" + res;

    return res;
}

function formatDate(str) {
    var d = new Date(parseInt(str));

    return MONTHS[d.getMonth()] + " " +
           pad(d.getDate()) + " " +
           pad(d.getHours()) + ":" +
           pad(d.getMinutes());
}

function msgSort(a, b) {
    return parseInt(a["created"]) - parseInt(b["created"]);
}

function post() {
    var text = $("nc").value;
    text = text.replace(/^\s+|\s+$/, "");
    text = text.replace(/\,/g, "\\,");
    text = text.replace(/\</g, "&lt;");
    text = text.replace(/\>/g, "&gt;");

    if (text != "") {
        var csv = "section string,created long,text string\n" +
                  window.location.pathname + "," +
                  new Date().getTime() + "," +
                  text;

        call("POST", "Append", csv);
        comments();
    } else
        alert("Please enter the commentary message, before submitting.");
}

function renderTable(msgs) {
    msgs = msgs.sort(msgSort);
    var html = "<table style='margin-bottom:1em'>";
    var style = "padding: 0 0 5px 0;text-align:right;width:95px;vertical-align:top;font-weight:bold;";
    for (var i = 0; i < msgs.length; ++i) {
        html += "<tr>";
        html +=  "<td style='" + style + "'>";
        html +=    formatDate(msgs[i]["created"]);
        html +=  "</td>";
        html +=  "<td style='padding: 0 0 5px 5px;vertical-align:top;'>";
        html +=    msgs[i]["text"].replace(/\\,/g, ",");
        html +=  "</td>";
        html += "</tr>";
    }
    html += "</table>";

    return html;
}

function pageComments() {
    var section = "section string\n" + window.location.pathname;

    var count = call("POST", "Count", section);
    var rel = call("POST", "List", section);
    var msgs = [];
    for (var t = rel.next(); t !== null; t = rel.next())
        msgs.push(t);

    var html = "<div style='text-align:right'>Comments: " +
               count.next()["cnt"] + "</div><hr style='color:#009445'/>";
    html += renderTable(msgs);
    html += "<div>Write your comment:</div>";
    html += "<textarea id='nc' style='width:100%;border:1px solid #009445' rows='2'></textarea>";
    html += "<div style='text-align:right;margin-bottom:1em;'>";
    html +=  "<input type='button' value='Post' onclick='post()'/>";
    html += "</div>";

    $("comments").innerHTML = html;
}

function fullComments(area) {
    var rel = call("GET", "Print");
    var byTitle = [];
    for (var t = rel.next(); t !== null; t = rel.next()) {
        var s = t["section"];
        if (!byTitle[s])
            byTitle[s] = [];

        byTitle[s].push(t);
    }

    var html = "";
    for (var s in byTitle) {
        html += "<h3 align='right'>" + s + "</h3><hr style='color:#009445'/>";
        html += renderTable(byTitle[s]);
    }

    area.innerHTML = html;
}

function comments() {
    var full = $("fullCommentary");
    try {
        if (full)
            fullComments(full);
        else
            pageComments();
    } catch (e) {
        /* swallow exceptions */
    }
}
