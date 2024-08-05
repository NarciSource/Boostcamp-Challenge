import readTable from "./objects.Table.read";
import writeTable from "./objects.Table.write";
import header_parse from "./parser.header";
import record_parse from "./parser.record";

export function insert(raw: string) {
    const header = header_parse(raw.split("\r\n")[0]);
    const record = record_parse(raw.split("\r\n").slice(1));

    const table = readTable(header);
    table.insert(record);

    writeTable(header.table_name, table.body);
}
