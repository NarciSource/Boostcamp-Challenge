import readTable from "./File.read";
import { Condition, Record } from "./File.type";

export default function select(table_name: string, condition: Condition): Record[] {
    const file = readTable(table_name);

    const records = file.select(condition);

    return records;
}
