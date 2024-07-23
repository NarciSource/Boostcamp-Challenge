const path_regex = /^(\/|\w:\\)?([\w\/\.\\]+(?:\/|\\))?([^./]+)(\.\w+)?$/;

export default class Path {
    root;
    name;
    ext;
    components;

    constructor(src) {
        const { root, name, ext, components } = this.#parse_filepath(src);

        this.root = root;
        this.name = name;
        this.ext = ext;
        this.components = components;
    }

    stringify() {
        JSON.stringify({
            root: this.root,
            base: this.base,
            name: this.name,
            ext: this.ext,
            components: this.components,
            absolute_string: this.absolute_string(),
            exist_file: this.exist_file(),
            file_size: this.file_size(),
        });
    }

    append_component(component) {
        this.components.push(component);
    }
    deleteLast_component() {
        this.components.pop();
    }

    #get_absolute(components = ["."]) {
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

    #parse_filepath(path_string) {
        if (path_regex.test(path_string)) {
            let [, root, components_string, name, ext] =
                path_regex.exec(path_string);

            let components = components_string
                ?.split(/\/|\\/)
                .filter((i) => i.length > 0);

            if (!root) {
                components = this.#get_absolute(components);
                root = components[0];
            } else {
                root =
                    process.platform === "linux"
                        ? "/"
                        : process.cwd().split(/\/|\\/)[0];
                components = [root].concat(components || []);
            }

            return {
                root,
                name,
                ext,
                components,
            };
        } else {
            throw "경로에 오류가 있습니다.";
        }
    }
}
