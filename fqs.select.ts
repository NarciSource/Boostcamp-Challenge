import { Body } from "./bttp.Response.type";
import readTable from "./File.read";
import { Condition } from "./File.type";

export default function select(
    table_name: string,
    condition: Condition,
): Body {
    const file = readTable(table_name);

    const records = file.select(condition);

    const data = JSON.stringify(records);

    return { data };
}
