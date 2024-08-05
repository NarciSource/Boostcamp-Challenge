import { Schema } from "./parser.type";

export default function parse(lines: string[]): Schema {
    const column_regex = /Column:\s*(\w+)\s*=\s*(String|Numeric)/;

    try {
        const fields: Schema["fields"] = lines
            .map((line) => column_regex.exec(line))
            .map(([, name, type]) => ({ [name]: { type } }));

        return { fields };
    } catch (e) {
        console.error("파일이 올바르지 않은 포맷입니다.");
    }
}
