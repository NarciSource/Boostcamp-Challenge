import readTable from "./File.read";
import { Condition, Record } from "./File.type";
import writeTable from "./File.write";

export default function delete_query(table_name: string, condition: Condition): Record[] {
    const file = readTable(table_name);

    const records = file.delete(condition);

    writeTable(table_name, file.body);

    return records;
}
