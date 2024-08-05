import fs from "fs";
import Papa from "papaparse";
import File from "./File";

export default function readTable(table_name: string): File {
    const raw = fs.readFileSync(table_name + ".csv", "utf8");
    const csv = Papa.parse(raw, { header: true, skipEmptyLines: true });

    const fields = csv.meta.fields.map((name: string) => ({ name, type: "String" }));
    const schema = { fields };
    const body = csv.data;

    return new File(schema, body);
}
