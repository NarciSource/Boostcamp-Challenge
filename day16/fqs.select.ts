import readFile from "./File.read";
import { Condition, Record } from "./File.type";

export default function select(file_name: string, condition: Condition): Record[] {
    const file = readFile(file_name);

    const records = file.select(condition);

    return records;
}
