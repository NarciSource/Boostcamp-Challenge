function analyze_syntax(tags) {
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

exports.analyze_syntax = analyze_syntax;
