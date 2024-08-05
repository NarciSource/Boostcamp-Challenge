import { Body, Header } from "./bttp.Response.type";
import readTable from "./File.read";
import { Record } from "./File.type";
import writeTable from "./File.write";

export default function insert(table_name: string, record: Record): [Header, Body?] {
    const file = readTable(table_name);

    file.insert(record);

    writeTable(table_name, file.body);

    const data = JSON.stringify(record);

    const header: Header = {
        code: 200,
        message: "OK",
        "Content-Type": "Text/JSON",
        "Content-Length": data.length,
    };
    const body: Body = { data };

    return [header, body];
}
