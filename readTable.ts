import fs from "fs";
import Papa from "papaparse";
import RequestObject, { Header } from "./objects.Request";

export default function readTable(header: Header) {
    const table_name = header.table_name;
    const raw = fs.readFileSync(table_name + ".csv", "utf8");
    const csv = Papa.parse(raw, { header: true, skipEmptyLines: true });

    const columns = csv.meta.fields.map((name: string) => ({ name, type: "String" }));
    const schema = { table_name, columns };
    const data = csv.data;

    return new RequestObject(header, schema, data);
}
