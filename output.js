const treatment = (tree) =>
    Object.entries(tree)
        .filter(([key, value]) => typeof value != "object" || Object.keys(value).length > 0)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: Array.isArray(value) ? value.map(treatment) : value }), {});

function element_by_attribute(attribute_name, tree) {
    function find(tree) {
        const found_elements = tree.children?.map(find).flat() || [];

        if (tree.attributes && attribute_name in tree.attributes) {
            found_elements.push(tree);
        }
        return found_elements;
    }

    return find(tree);
}

function report_by_class(tree) {
    function collect(tree) {
        const arr = tree.children?.map(collect).flat() || [];
        return [...arr, tree?.tag_name];
    }
    const counter = {};
    collect(tree).forEach((item) => (counter[item] = (counter[item] || 0) + 1));
    return counter;
}

exports.treatment = treatment;
exports.display_json = (json) => console.log(JSON.stringify(json, null, 2));
exports.element_by_attribute = element_by_attribute;
exports.report_by_class = report_by_class;
