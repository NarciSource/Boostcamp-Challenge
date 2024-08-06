import fs from "fs";
import Papa from "papaparse";
import { Schema } from "./File.type";

export type Meta = {
    file: string;
    name: string;
    type: "Numeric" | "String";
};

const meta_path = "meta.csv";

function read_meta(): Meta[] {
    if (!fs.existsSync(meta_path)) {
        const fields = ["file", "name", "type"];
        const save_csv = Papa.unparse({ fields });

        fs.writeFileSync(meta_path, save_csv);
    }
    const raw = fs.readFileSync(meta_path, "utf8");

    const meta: Meta[] = Papa.parse(raw, { header: true, skipEmptyLines: true }).data;

    return meta;
}

export function read_schema(file_name: string): Schema {
    const meta = read_meta();

    const fields = meta
        .filter(({ file }) => file === file_name)
        .reduce((acc, { name, type }) => ({ ...acc, [name]: { type } }), {} as Schema["fields"]);

    return { fields };
}

export function insert_schema(file_name: string, schema: Schema): void {
    const pre_meta = read_meta();

    const meta: Meta[] = Object.entries(schema.fields).map(([name, value]) => ({
        file: file_name,
        name,
        type: value.type,
    }));

    const save_csv = Papa.unparse([...pre_meta, ...meta], { quote: false });
    fs.writeFileSync(meta_path, save_csv);
}
