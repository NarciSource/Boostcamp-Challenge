import readTable from "./File.read";
import { Condition, Record, Tuple } from "./File.type";
import writeTable from "./File.write";

export default function update(table_name: string, condition: Condition, restore: Tuple): Record[] {
    const file = readTable(table_name);

    const records = file.update(restore, condition);

    writeTable(table_name, file.body);

    return records;
}
