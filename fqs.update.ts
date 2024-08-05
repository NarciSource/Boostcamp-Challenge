import fs from "fs";
import Papa from "papaparse";
import RequestObject from "./objects.Request";

export default function update(file: string) {
    const header_regex = /(\w+) (\w+) (\w+)/;
    const column_regex = /Column:\s*(\w+)/;
    const value_regex = /Value:\s*"(\w+)"/;
    const condition_regex = /Condition:\s*(\w+)=([\w]+)/;

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

    const [, restore_column] = column_regex.exec(lines[1]);
    const [, restore_value] = value_regex.exec(lines[2]);
    const [, condition_column, condition_value] = condition_regex.exec(lines[3]);

    request_object.body = request_object.body.map((field) => {
        if (field[condition_column] === condition_value) {
            field[restore_column] = restore_value;
        }
        return field;
    });

    const save_csv = Papa.unparse(request_object.body, { quote: false });
    console.log(save_csv);
    fs.writeFileSync(table_name + ".csv", save_csv);

    console.log("<<<<<<<<");
    console.log(request_object.body);
}
