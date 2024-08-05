import fs from "fs";
import Papa from "papaparse";
import RequestObject from "./objects.Request";
import Table from "./objects.Table";
import header_parse from "./parser.header";
import schema_parse from "./parser.schema";

export function create(raw: string) {
    const header = header_parse(raw.split("\r\n")[0]);
    const schema = schema_parse(raw.split("\r\n").slice(1));

    const table = new Table(schema);
    const request_object = new RequestObject(header, table);

    const table_name = request_object.header.table_name;
    const fields = table.columns;

    try {
        const save_csv = Papa.unparse({ fields });
        fs.writeFileSync(table_name + ".csv", save_csv);
    } catch (e) {
        console.error(e);
    }
}
