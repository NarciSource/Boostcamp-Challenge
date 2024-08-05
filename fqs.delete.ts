import readTable from "./objects.Table.read";
import writeTable from "./objects.Table.write";

export default function delete_query(
    table_name: string,
    [condition_column, condition_value]: [string, string],
) {
    const table = readTable(table_name);

    table.body = table.body.filter((field) => field[condition_column] !== condition_value);

    writeTable(table_name, table.body);
}
