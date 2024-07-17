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
        const [, key, value] = match;
        attributes[key] = value;
    }
    return tag_name && { [tag_name]: attributes };
}

function split_tokens(xml) {
    const element_regex_str = "<[^>?]+>";
    const text_regex_str = "[^<>]+";
    const union_regex_str = `\\s*((?:${element_regex_str})|(?:${text_regex_str}))\\s*`;
    const union_regex = new RegExp(union_regex_str, "g");

    const tokens = [];
    while ((match = union_regex.exec(xml)) !== null) {
        tokens.push(match[1]);
    }
    return tokens;
}

function analyze_lexical(token) {
    // token : element | text
    const tag_regex = /<(\/)?([^>/\s]+)([^>]*?)(\/)?>/;
    const attributes_regex = /(\w+)="(.*?)"/g;

    if (tag_regex.test(token)) {
        const [, first, tag_name, attributes_line, last] = tag_regex.exec(token);

        if (first == "/") {
            return {
                tag_name,
                type: "close_tag",
            };
        } else {
            const attributes = {};
            while ((match = attributes_regex.exec(attributes_line)) !== null) {
                const [, key, value] = match;
                attributes[key] = value;
            }

            return {
                tag_name,
                attributes,
                type: last == "/" ? "closure_tag" : "open_tag",
            };
        }
    } else {
        return {
            type: "scalar",
            text: token,
        };
    }
}

function make_parse_tree(tags) {
    stack = [];
    for (const tag of tags) {
        if (tag.type != "close_tag") {
            stack.push(tag);
        } else {
            siblings = [];
            while ((element = stack.pop())?.type != "open_tag") {
                siblings.push(element);
            }

            element["children"] = siblings.reverse();
            element["type"] = "closure";
            stack.push(element);
        }
    }
    return stack[0];
}
function treatment({ tag_name, attributes, children, text }) {
    const tree = {};
    if (tag_name) {
        tree.tag_name = tag_name;
    }
    if (attributes && Object.keys(attributes).length) {
        tree.attributes = attributes;
    }
    if (children?.length) {
        tree.children = children.map(treatment);
    }
    if (text) {
        tree.text = text;
    }
    return tree;
}

function display_json(json) {
    console.log(JSON.stringify(json, null, 2));
}

async function main() {
    let xml = await fs.readFile("sample2.xml", "utf8");

    // clean up
    xml = delete_comment(xml);
    xml = delete_end_of_line(xml);

    // parse prolog
    let prolog_xml;
    [prolog_xml, xml] = split_prolog(xml);
    const meta = parse_prolog(prolog_xml);

    // parse element
    const tokens = split_tokens(xml);
    const tags = tokens.map(analyze_lexical);
    const data = treatment(make_parse_tree(tags));

    const json = { meta, data };
    display_json(json);
}
main();
