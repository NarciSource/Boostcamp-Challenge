import readTable from "./objects.Table.read";
import writeTable from "./objects.Table.write";
import header_parse from "./parser.header";
import condition_parse from "./parser.condition";
import restore_parse from "./parser.restore";

export default function update(raw: string) {
    const header = header_parse(raw.split("\r\n")[0]);
    const [condition_column, condition_value] = condition_parse(raw.split("\r\n")[3]);
    const [restore_column, restore_value] = restore_parse(raw.split("\r\n").slice(1, 3));

    const table = readTable(header);

    table.body = table.body.map((record) => {
        if (record[condition_column] === condition_value) {
            record[restore_column] = restore_value;
        }
        return record;
    });

    writeTable(header.table_name, table.body);
}
