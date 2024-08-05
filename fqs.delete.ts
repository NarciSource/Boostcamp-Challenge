import readTable from "./objects.Table.read";
import writeTable from "./objects.Table.write";
import header_parse from "./headerParse";

export default function delete_query(raw: string) {
    const header = header_parse(raw.split("\r\n")[0]);
    const [condition_column, condition_value] = parse(raw.split("\r\n").slice(1));

    const table = readTable(header);

    table.body = table.body.filter((field) => field[condition_column] !== condition_value);

    writeTable(header.table_name, table.body);
}

function parse(lines: string[]): [string, string] {
    const condition_regex = /Condition:\s*(\w+)=(\w+)/;

    const [, condition_column, condition_value] = condition_regex.exec(lines[1]);
    return [condition_column, condition_value];
}
