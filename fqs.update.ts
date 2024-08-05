import readTable from "./File.read";
import writeTable from "./File.write";

export default function update(
    table_name: string,
    [condition_column, condition_value]: [string, string],
    [restore_column, restore_value]: [string, string],
) {
    const file = readTable(table_name);

    file.body = file.body.map((record) => {
        if (record[condition_column] === condition_value) {
            record[restore_column] = restore_value;
        }
        return record;
    });

    writeTable(table_name, file.body);
}
