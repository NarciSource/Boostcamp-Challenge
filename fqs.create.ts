import fs from "fs";
import Papa from "papaparse";
import File from "./File";
import { Schema } from "./File.type";
import { code } from "./fqs.code";
import { insert_schema } from "./fqs.meta";

export default function create(file_name: string, schema: Schema): void {
    const file = new File(schema);
    const fields = file.fields;

    const save_csv = Papa.unparse({ fields });

    if (fs.existsSync(file_name + ".csv")) {
        throw { code: code.EEXIST };
    }

    insert_schema(file_name, schema);
    fs.writeFileSync(file_name + ".csv", save_csv);
}
