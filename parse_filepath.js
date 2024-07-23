import fs from "fs";

const path_regex = /^(\/|\w:\\)?([\w\/\.\\]+(?:\/|\\))?([^./]+)(\.\w+)?$/;

function get_absolute(components = ["."]) {
    const current_dir = process.cwd().split(/\/|\\/);

    if (process.platform === "linux") {
        current_dir[0] = "/";
    }

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

function is_exist_file(absolute_string) {
    try {
        fs.accessSync(absolute_string, fs.constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
}

function get_file_size(absolute_string) {
    try {
        console.log(absolute_string)
        const stats = fs.statSync(absolute_string);
        console.log(stats)
        return stats.size;
    } catch (error) {
        throw error;
    }
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
            root =
                process.platform === "linux"
                    ? "/"
                    : process.cwd().split(/\/|\\/)[0];
            components = [root].concat(components || []);
        }

        const root_separator = process.platform === "win32" ? "/" : "";
        const middle_path = components.slice(1).join("/");
        const middle_separator = middle_path ? "/" : "";
        const base = `${name}${ext || ""}`;
        const absolute_string = `${root}${root_separator}${middle_path}${middle_separator}${base}`;
        const exist_file = is_exist_file(absolute_string);
        const file_size = exist_file ? get_file_size(absolute_string) : 0;

        return {
            root,
            base,
            name,
            ext,
            components,
            absolute_string,
            exist_file,
            file_size,
        };
    } else {
        throw "경로에 오류가 있습니다.";
    }
}
