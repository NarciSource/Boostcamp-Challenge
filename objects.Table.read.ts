import fs from "fs";
import Papa from "papaparse";
import Table from "./objects.Table";

export default function readTable(table_name: string): Table {
    const raw = fs.readFileSync(table_name + ".csv", "utf8");
    const csv = Papa.parse(raw, { header: true, skipEmptyLines: true });

    const columns = csv.meta.fields.map((name: string) => ({ name, type: "String" }));
    const schema = { columns };
    const body = csv.data;

    return new Table(schema, body);
}
