import fs from "fs";
import Papa from "papaparse";
import RequestObject from "./objects.Request";

export default function delete_query(file: string) {
    const header_regex = /(\w+) (\w+) (\w+)/;
    const condition_regex = /Condition:\s*(\w+)=(\w+)/;

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

    const [, column, value] = condition_regex.exec(lines[1]);

    request_object.body = request_object.body.filter((field) => field[column] !== value);

    const save_csv = Papa.unparse(request_object.body, { quote: false });
    console.log(save_csv);
    fs.writeFileSync(table_name + ".csv", save_csv);

    console.log("<<<<<<<<");
    console.log(request_object.body);
}
