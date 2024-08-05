import readTable from "./objects.Table.read";
import header_parse from "./headerParse";

export default function select(raw: string) {
    const header = header_parse(raw.split("\r\n")[0]);
    const [condition_column, condition_value] = parse(raw.split("\r\n").slice(1));

    const table = readTable(header);

    const found_fields = table.body.filter((record) => {
        return record[condition_column] === condition_value;
    });

    console.log("<<<<<<<<");
    console.log(found_fields);
}

function parse(lines: string[]): [string, string] {
    const condition_regex = /Condition:\s*(\w+)="(\w+)"/;

    const [, condition_column, condition_value] = condition_regex.exec(lines[1]);
    return [condition_column, condition_value];
}
