import fs from "fs";
import Papa from "papaparse";
import RequestObject from "./objects.Request";

export default function select(file: string) {
    const header_regex = /(\w+) (\w+) (\w+)/;
    const condition_regex = /Condition:\s*(\w+)="(\w+)"/;

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
    request_object.body = result.data;

    console.log(1)
    const [, column, value] = condition_regex.exec(lines[1]);

    console.log(2,column, value)
    const found_fields = request_object.body.filter((field) =>{ console.log(field, column, value); return field[column] === value});

    console.log("<<<<<<<<");
    console.log(found_fields);
}
