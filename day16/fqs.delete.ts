import readFile from "./File.read";
import { Condition, Record } from "./File.type";
import writeFile from "./File.write";

export default function delete_query(file_name: string, condition: Condition): Record[] {
    const file = readFile(file_name);

    const records = file.delete(condition);

    writeFile(file_name, file.body);

    return records;
}
