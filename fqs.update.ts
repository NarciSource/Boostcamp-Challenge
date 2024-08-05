import { Body } from "./bttp.Response.type";
import readTable from "./File.read";
import writeTable from "./File.write";

export default function update(
    table_name: string,
    [condition_column, condition_value]: [string, string],
    [restore_column, restore_value]: [string, string],
): Body {
    const file = readTable(table_name);

    const records = file.update(
        [restore_column, restore_value],
        [condition_column, condition_value],
    );
    const data = JSON.stringify(records);

    writeTable(table_name, file.body);

    return { data };
}
