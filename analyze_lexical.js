const regex = require("./regex.js").regex;

function parse_attributes(line) {
    const attributes = {};
    while ((match = regex.attributes.exec(line)) !== null) {
        const [, key, value] = match;
        attributes[key] = value;
    }
    return attributes;
}

function analyzer_for_prolog(token) {
    if (([, tag_name, line] = regex.split.exec(token) || [])) {
        return {
            [tag_name]: parse_attributes(line),
        };
    }
}

function analyzer_for_root(token) {
    if (regex.tag.test(token)) {
        const [, first, tag_name, line, last] = regex.tag.exec(token);

        if (first == "/") {
            return {
                tag_name,
                type: "close_tag",
            };
        } else {
            return {
                tag_name,
                attributes: parse_attributes(line),
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
function analyze_lexical(tokens, part) {
    const analyzer = part == "prolog" ? analyzer_for_prolog : analyzer_for_root;
    return tokens.map(analyzer);
}

exports.analyze_lexical = analyze_lexical;
