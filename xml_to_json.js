const fs = require("fs").promises;

function delete_comment(xml) {
    const comment_regex = /<!.*>/gi;
    return xml.replaceAll(comment_regex, "");
}

function delete_end_of_line(xml) {
    const eol_regex = /[\r\n]+/g;
    return xml.replaceAll(eol_regex, "");
}

function split_prolog(xml) {
    const prolog_regex = /<\?([^>?]+)\?>/;

    const match = prolog_regex.exec(xml);

    const before_match_xml = xml.slice(0, match?.index || 0);
    const after_match_xml = xml.slice(match?.index || 0 + match?.[0].length || 0);

    const matched_xml = match?.[1];
    const remains_xml = before_match_xml + after_match_xml;

    return [matched_xml, remains_xml];
}

function parse_prolog(prolog_xml) {
    const split_regex = /(^\w+) (.*)/;
    const attributes_regex = /(\w+)="(.*?)"/g;

    const [, tag_name, attributes_line] = split_regex.exec(prolog_xml) || [];

    const attributes = {};
    while ((match = attributes_regex.exec(attributes_line)) !== null) {
        [, key, value] = match;
        attributes[key] = value;
    }
    return tag_name && { [tag_name]: attributes };
}

async function main() {
    const json_tree = {};
    let xml = await fs.readFile("sample2.xml", "utf8");

    // clean up
    xml = delete_comment(xml);
    xml = delete_end_of_line(xml);

    // parse prolog
    let prolog_xml;
    [prolog_xml, xml] = split_prolog(xml);

    json_tree["prolog"] = parse_prolog(prolog_xml);



    console.log(json_tree);
}
main();
