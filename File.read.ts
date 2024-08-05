import fs from "fs";
import Papa from "papaparse";
import File from "./File";
import { Schema } from "./File.type";

export default function readFile(file_name: string): File {
    const raw = fs.readFileSync(file_name + ".csv", "utf8");
    const csv = Papa.parse(raw, { header: true, skipEmptyLines: true });

    const fields = csv.meta.fields.reduce(
        (acc: Schema["fields"], name: string) => ({ ...acc, [name]: "String" }),
        {},
    );
    const schema = { fields };
    const body = csv.data;

    return new File(schema, body);
}
