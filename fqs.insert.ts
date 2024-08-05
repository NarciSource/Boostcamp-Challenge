import readTable from "./objects.Table.read";
import { Record } from "./objects.Table.type";
import writeTable from "./objects.Table.write";

export default function insert(table_name: string, record: Record) {
    const table = readTable(table_name);
    table.insert(record);

    writeTable(table_name, table.body);
}
