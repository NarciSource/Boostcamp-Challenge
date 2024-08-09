import { Schema } from "./parser.type";

export default function parse(lines: string[]): Schema {
    const column_regex = /Column:\s*(\w+)\s*=\s*(String|Numeric)/i;

    const fields: Schema["fields"] = lines
        .map((line) => column_regex.exec(line))
        .reduce((acc, [, name, type]) => ({ ...acc, [name]: { type } }), {});

    return { fields };
}
