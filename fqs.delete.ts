import readTable from "./File.read";
import writeTable from "./File.write";

export default function delete_query(
    table_name: string,
    [condition_column, condition_value]: [string, string],
) {
    const file = readTable(table_name);

    file.body = file.body.filter((field) => field[condition_column] !== condition_value);

    writeTable(table_name, file.body);
}
