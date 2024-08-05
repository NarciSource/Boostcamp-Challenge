import fs from "fs";
import Papa from "papaparse";
import RequestObject, { Field } from "./objects.Request";
import { zip } from "./utils";

export function insert(file: string) {
    const header_regex = /(\w+) (\w+) (\w+)/;
    const column_regex = /Column:\s*(\w+)/;
    const field_regex = /Value:\s*(\d+|"[\w\s]+")/;

    console.log(">>>>>>>>");
    console.log(file);

    const lines = file.split("\r\n");
    const [, query_type, table_name, bttp] = header_regex.exec(lines[0]);

    const csv = fs.readFileSync(table_name + ".csv", "utf8");
    const result = Papa.parse(csv, { header: true, skipEmptyLines: true });

    const header = { query_type, bttp };
    const columns = result.meta.fields.map((name: string) => ({ name, type: "String" }));
    const schema = { table_name, columns };

    const request_object = new RequestObject(header, schema);

    if (lines.length - 1 !== columns.length * 2) {
        throw "";
    }

    const column_names = lines
        .slice(1, 1 + (lines.length - 1) / 2)
        .map((line) => column_regex.exec(line))
        .map(([, name]) => name);

    const column_values = lines
        .slice(1 + (lines.length - 1) / 2)
        .map((line) => field_regex.exec(line))
        .map(([, value]) => value);

    const field: Field = [...zip(column_names, column_values)].reduce(
        (acc, [name, value]) => ({ ...acc, [name]: value }),
        {} as Field,
    );

    request_object.insert(field);

    const save_csv = Papa.unparse(request_object.body, { quote: false });
    console.log(save_csv);
    fs.writeFileSync(table_name + ".csv", save_csv);

    console.log("<<<<<<<<");
    console.log(request_object.body);
}
