import readTable from "./objects.Table.read";
import writeTable from "./objects.Table.write";
import header_parse from "./parser.header";
import condition_parse from "./parser.condition";

export default function delete_query(raw: string) {
    const header = header_parse(raw.split("\r\n")[0]);
    const [condition_column, condition_value] = condition_parse(raw.split("\r\n")[1]);

    const table = readTable(header);

    table.body = table.body.filter((field) => field[condition_column] !== condition_value);

    writeTable(header.table_name, table.body);
}
