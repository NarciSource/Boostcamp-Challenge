const fs = require("fs").promises;
const regex = require("./regex.js").regex;

function delete_comment(xml) {
    return xml.replaceAll(regex.comment, "");
}

function delete_end_of_line(xml) {
    return xml.replaceAll(regex.eol, "");
}

function split_prolog(xml) {
    const match = regex.prolog.exec(xml);

    const before_match_xml = xml.slice(0, match?.index || 0);
    const after_match_xml = xml.slice(match?.index || 0 + match?.[0].length || 0);

    const matched_xml = match?.[1];
    const remains_xml = before_match_xml + after_match_xml;

    return [matched_xml, remains_xml];
}

function parse_prolog(prolog_xml) {
    const [, tag_name, attributes_line] = regex.split.exec(prolog_xml) || [];

    const attributes = {};
    while ((match = regex.attributes.exec(attributes_line)) !== null) {
        const [, key, value] = match;
        attributes[key] = value;
    }
    return tag_name && { [tag_name]: attributes };
}

function split_tokens(xml) {
    const tokens = [];
    while ((match = regex.distinction.exec(xml)) !== null) {
        tokens.push(match[1]);
    }
    return tokens;
}

function analyze_lexical(token) {
    // token : element | text
    if (regex.tag.test(token)) {
        const [, first, tag_name, attributes_line, last] = regex.tag.exec(token);

        if (first == "/") {
            return {
                tag_name,
                type: "close_tag",
            };
        } else {
            const attributes = {};
            while ((match = regex.attributes.exec(attributes_line)) !== null) {
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
