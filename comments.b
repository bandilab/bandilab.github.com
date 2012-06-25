type Sections {section string}

type Comments {section string, created long, text string}

var all Comments;

fn Append(c Comments) void
{
    all += c;
}

fn List(s Sections) Comments
{
    return (join all s);
}

fn Count(s Sections) {cnt int}
{
    return (summary cnt = cnt all s);
}

fn Print() Comments
{
    return all;
}

