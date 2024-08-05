import readTable from "./objects.Table.read";
import writeTable from "./objects.Table.write";

export default function update(
    table_name: string,
    [condition_column, condition_value]: [string, string],
    [restore_column, restore_value]: [string, string],
) {
    const table = readTable(table_name);

    table.body = table.body.map((record) => {
        if (record[condition_column] === condition_value) {
            record[restore_column] = restore_value;
        }
        return record;
    });

    writeTable(table_name, table.body);
}
