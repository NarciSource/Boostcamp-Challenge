import fs from "fs";

export default function drop(file: string) {
    const header_regex = /(\w+) (\w+) (\w+)/;

    console.log(">>>>>>>>");
    console.log(file);

    const lines = file.split("\r\n");
    const [, query_type, table_name, bttp] = header_regex.exec(lines[0]);

    fs.unlinkSync(table_name + ".csv");
}
