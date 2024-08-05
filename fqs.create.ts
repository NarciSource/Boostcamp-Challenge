import fs from "fs";
import Papa from "papaparse";
import File from "./File";
import { Schema } from "./File.type";

export default function create(table_name: string, schema: Schema): void {
    const file = new File(schema);
    const fields = file.fields;

    const save_csv = Papa.unparse({ fields });

    if (fs.existsSync(table_name + ".csv")) {
        throw { code: "EEXIST" };
    }

    fs.writeFileSync(table_name + ".csv", save_csv);
}
