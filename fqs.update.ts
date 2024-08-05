import readTable from "./readTable";
import header_parse from "./headerParse";
import writeTable from "./writeTable";

export default function update(raw: string) {
    const header = header_parse(raw.split("\r\n")[0]);
    const [restore_column, restore_value, condition_column, condition_value] = parse(
        raw.split("\r\n").slice(1),
    );

    const table = readTable(header);

    table.body = table.body.map((record) => {
        if (record[condition_column] === condition_value) {
            record[restore_column] = restore_value;
        }
        return record;
    });

    writeTable(header.table_name, table.body);
}

function parse(lines: string[]): [string, string, string, string] {
    const column_regex = /Column:\s*(\w+)/;
    const value_regex = /Value:\s*"(\w+)"/;
    const condition_regex = /Condition:\s*(\w+)=([\w]+)/;

    const [, restore_column] = column_regex.exec(lines[1]);
    const [, restore_value] = value_regex.exec(lines[2]);
    const [, condition_column, condition_value] = condition_regex.exec(lines[3]);

    return [restore_column, restore_value, condition_column, condition_value];
}
