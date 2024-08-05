import { Record } from "./objects.Table.type";
import readTable from "./objects.Table.read";
import writeTable from "./objects.Table.write";
import header_parse from "./headerParse";
import { zip } from "./utils";

export function insert(raw: string) {
    const header = header_parse(raw.split("\r\n")[0]);
    const record = parse(raw.split("\r\n").slice(1));

    const table = readTable(header);
    table.insert(record);

    writeTable(header.table_name, table.body);
}

function parse(lines: string[]): Record {
    const column_regex = /Column:\s*(\w+)/;
    const field_regex = /Value:\s*(\d+|"[\w\s]+")/;

    const column_names = lines
        .slice(1, 1 + (lines.length - 1) / 2)
        .map((line) => column_regex.exec(line))
        .map(([, name]) => name);

    const column_values = lines
        .slice(1 + (lines.length - 1) / 2)
        .map((line) => field_regex.exec(line))
        .map(([, value]) => value);

    const record: Record = [...zip(column_names, column_values)].reduce(
        (acc, [name, value]) => ({ ...acc, [name]: value }),
        {} as Record,
    );

    return record;
}
