import { Body } from "./bttp.Response.type";
import readTable from "./File.read";
import writeTable from "./File.write";
import { Record } from "./File.type";

export default function insert(table_name: string, record: Record): Body {
    const file = readTable(table_name);

    file.insert(record);

    writeTable(table_name, file.body);

    const data = JSON.stringify(record);

    return { data };
}
