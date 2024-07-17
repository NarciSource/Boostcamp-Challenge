const fs = require("fs").promises;
const regex = require("./regex.js").regex;
const { delete_comment, delete_end_of_line } = require("./clean_up.js");
const { display_json } = require("./output.js");
const { analyze_lexical } = require("./analyze_lexical.js");
const { analyze_syntax } = require("./analyze_syntax.js");

function split_prolog_root(xml) {
    const match = regex.prolog.exec(xml);
    const matched_xml = match?.[1];
    const remains_xml = xml.replace(match?.[0], "");
    return [matched_xml, remains_xml];
}

function tokenize(xml) {
    const tokens = [];
    while ((match = regex.tokenize.exec(xml)) !== null) {
        tokens.push(match[1]);
    }
    return tokens;
}

async function main() {
    let xml = await fs.readFile("sample2.xml", "utf8");
    xml = delete_comment(xml);
    xml = delete_end_of_line(xml);

    const [prolog_xml, root_xml] = split_prolog_root(xml);

    function compiler(xml, part) {
        const tokens = tokenize(xml);
        const tags = analyze_lexical(tokens, part);
        const tree = analyze_syntax(tags);
        return tree;
    }

    const meta = compiler(prolog_xml, "prolog");
    const data = compiler(root_xml, "root");

    display_json({ meta, data });
}
main();
