import fs from "fs";
import Papa from "papaparse";
import File from "./File";
import { read_schema } from "./fqs.meta";

export default function readFile(file_name: string): File {
    const raw = fs.readFileSync(file_name + ".csv", "utf8");
    const csv = Papa.parse(raw, { header: true, skipEmptyLines: true });

    const schema = read_schema(file_name);
    const body = csv.data;

    return new File(schema, body);
}
