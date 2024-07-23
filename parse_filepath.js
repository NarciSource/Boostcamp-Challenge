const path_regex = /^(\/|\w:\\)?([\w\/\.\\]+(?:\/|\\))?([^./]+)(\.\w+)?$/;

function get_absolute(components = ["."]) {
    const current_dir = process.cwd().split(/\/|\\/);

    let index;
    for (const [i, component] of Object.entries(components)) {
        index = i;
        if (component === "..") {
            current_dir.pop();
        } else if (component === ".") {
            index = i + 1;
            break;
        } else {
            break;
        }
    }
    return current_dir.concat(components.slice(index));
}
export function parse_filepath(path_string) {
    if (path_regex.test(path_string)) {
        let [, root, components_string, name, ext] =
            path_regex.exec(path_string);

        let components = components_string
            ?.split(/\/|\\/)
            .filter((i) => i.length > 0);

        if (!root) {
            components = get_absolute(components);
            root = components[0];
        } else {
            root = process.cwd().split(/\/|\\/)[0];
            components = [root].concat(components || []);
        }

        let base = `${name}${ext || ""}`;

        let absolute_string = `${components.join("/")}/${base}`;

        return {
            root,
            base,
            name,
            ext,
            components,
            absolute_string,
        };
    } else {
        console.log(path_string);
        throw "경로에 오류가 있습니다.";
    }
}
