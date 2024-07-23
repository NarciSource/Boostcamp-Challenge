const path_regex = /^(\/|\w:\\)?([\w\/\.\\]+(?:\/|\\))?([^./]+)(\.\w+)?$/;

export default class Path {
    root;
    name;
    ext;
    #components;

    constructor(src) {
        const { root, name, ext, components } = Path.parse_filepath(src);

        this.root = root;
        this.name = name;
        this.ext = ext;
        this.components = components;
    }

    get components() {
        return this.#components;
    }
    set components(components) {
        const is_valid = (value) => true;

        if (is_valid(components)) {
            this.#components = components;
        }
    }

    get base() {
        `${this.name}${this.ext || ""}`;
    }
    set base(base) {
        const regex = /(\w+).(\w+)/;

        if (regex.test(base)) {
            const [, name, ext] = regex.exec(base);
            this.name = name;
            this.ext = ext;
        } else {
            throw "올바르지 않은 파일 형식입니다.";
        }
    }

    get absolute_string() {
        const root_separator = process.platform === "win32" ? "/" : "";
        const middle_path = this.components.slice(1).join("/");
        const middle_separator = middle_path ? "/" : "";

        return `${this.root}${root_separator}${middle_path}${middle_separator}${this.base}`;
    }

    get exist_file() {
        try {
            fs.accessSync(this.absolute_string(), fs.constants.F_OK);
            return true;
        } catch (err) {
            return false;
        }
    }

    get file_size() {
        try {
            const stats = fs.statSync(this.absolute_string());
            return stats.size;
        } catch (error) {
            throw error;
        }
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

    static get_absolute(components = ["."]) {
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

    static parse_filepath(path_string) {
        if (path_regex.test(path_string)) {
            let [, root, components_string, name, ext] =
                path_regex.exec(path_string);

            let components = components_string
                ?.split(/\/|\\/)
                .filter((i) => i.length > 0);

            if (!root) {
                components = Path.get_absolute(components);
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
