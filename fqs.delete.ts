import readTable from "./File.read";
import writeTable from "./File.write";
import { Body } from "./bttp.Response.type";

export default function delete_query(
    table_name: string,
    [condition_column, condition_value]: [string, string],
): Body {
    const file = readTable(table_name);

    const records = file.delete([condition_column, condition_value]);
    const data = JSON.stringify(records);

    writeTable(table_name, file.body);

    return { data };
}
