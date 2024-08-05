import fs from "fs";
import Papa from "papaparse";
import RequestObject, { Schema } from "./objects.Request";
import header_parse from "./headerParse";

export function create(raw: string) {
    const header = header_parse(raw.split("\r\n")[0]);
    const schema = parse(raw.split("\r\n").slice(1));

    const request_object = new RequestObject(header, schema);

    const table_name = request_object.header.table_name;
    const fields = request_object.columns;

    try {
        const save_csv = Papa.unparse({ fields });
        fs.writeFileSync(table_name + ".csv", save_csv);
    } catch (e) {
        console.error(e);
    }
}

function parse(lines: string[]): Schema {
    const column_regex = /Column:\s*(\w+)\s*=\s*(\w+)/;

    try {
        const columns: Schema["columns"] = lines
            .map((line) => column_regex.exec(line))
            .map(([, name, type]) => ({ name, type }));

        return { columns };
    } catch (e) {
        console.error("파일이 올바르지 않은 포맷입니다.");
    }
}
