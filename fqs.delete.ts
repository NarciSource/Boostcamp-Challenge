import readTable from "./File.read";
import { Condition } from "./File.type";
import writeTable from "./File.write";
import { Body } from "./bttp.Response.type";

export default function delete_query(table_name: string, condition: Condition): Body {
    const file = readTable(table_name);

    const records = file.delete(condition);
    const data = JSON.stringify(records);

    writeTable(table_name, file.body);

    return { data };
}
