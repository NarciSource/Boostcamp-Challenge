import { parse_filepath } from "./parse_filepath.js";

export default class Path {
    root;
    base;
    name;
    ext;
    components;
    #absolute_string;
    #exist_file;
    #file_size;

    constructor(src) {
        const {
            root,
            base,
            name,
            ext,
            components,
            absolute_string,
            exist_file,
            file_size,
        } = parse_filepath(src);

        this.root = root;
        this.base = base;
        this.name = name;
        this.ext = ext;
        this.components = components;
        this.#absolute_string = absolute_string;
        this.#exist_file = exist_file;
        this.#file_size = file_size;
    }
    stringify() {
        JSON.stringify({
            root: this.root,
            base: this.base,
            name: this.name,
            ext: this.ext,
            components: this.components,
            absolute_string: this.#absolute_string,
            exist_file: this.#exist_file,
            file_size: this.#file_size,
        });
    }

    append_component(component) {
        this.components.push(component);
    }
    deleteLast_component() {
        this.components.pop();
    }
}
