import { Body } from "./bttp.Response.type";
import readTable from "./File.read";
import { Record } from "./File.type";
import writeTable from "./File.write";

export default function insert(table_name: string, record: Record): Body {
    const file = readTable(table_name);

    file.insert(record);

    writeTable(table_name, file.body);

    const data = JSON.stringify(record);

    return { data };
}
