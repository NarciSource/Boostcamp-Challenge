const fs = require("fs").promises;

function delete_comment(xml) {
    const comment_regex = /<!.*>/gi;
    return xml.replaceAll(comment_regex, "");
}

function delete_end_of_line(xml) {
    const eol_regex = /[\r\n]+/g;
    return xml.replaceAll(eol_regex, "");
}

async function main() {
    let xml = await fs.readFile("sample1.xml", "utf8");

    xml = delete_comment(xml);
    xml = delete_end_of_line(xml);

    console.log(xml);
}
main();
