import fs from "fs";
import Papa from "papaparse";
import Table from "./objects.Table";
import { Schema } from "./objects.Table.type";

export default function create(table_name: string, schema: Schema) {
    const table = new Table(schema);

    const fields = table.columns;

    try {
        const save_csv = Papa.unparse({ fields });
        fs.writeFileSync(table_name + ".csv", save_csv);
    } catch (e) {
        console.error(e);
    }
}
