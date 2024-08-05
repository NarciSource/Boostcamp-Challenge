import { Body } from "./bttp.Response.type";
import readTable from "./File.read";
import { Condition, Tuple } from "./File.type";
import writeTable from "./File.write";

export default function update(table_name: string, condition: Condition, restore: Tuple): Body {
    const file = readTable(table_name);

    const records = file.update(restore, condition);
    const data = JSON.stringify(records);

    writeTable(table_name, file.body);

    return { data };
}
