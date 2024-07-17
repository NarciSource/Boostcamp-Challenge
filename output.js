const treatment = (tree) =>
    Object.entries(tree)
        .filter(([key, value]) => typeof value != "object" || Object.keys(value).length > 0)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: Array.isArray(value) ? value.map(treatment) : value }), {});

exports.display_json = (json) => console.log(JSON.stringify(treatment(json), null, 2));
