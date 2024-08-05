import { Body } from "./bttp.Response.type";
import readTable from "./File.read";

export default function select(
    table_name: string,
    [condition_column, condition_value]: [string, string],
): Body {
    const file = readTable(table_name);

    const records = file.select([condition_column, condition_value]);

    const data = JSON.stringify(records);

    return { data };
}
