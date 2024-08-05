import fs from "fs";
import { parse } from "json2csv";
import { make_table } from "./objects.Request";

export function create(file: string) {
    const request_object = make_table(file);

    const table_name = request_object.schema.table_name;
    const fields = request_object.schema.columns.map((column) => column.name);

    try {
        const csv = parse([], { fields, quote: "" });
        fs.writeFileSync(table_name + ".csv", csv);
    } catch (e) {
        console.error(e);
    }
}
