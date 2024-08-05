import readFile from "./File.read";
import { Condition, Record, Tuple } from "./File.type";
import writeFile from "./File.write";

export default function update(
    file_name: string,
    { condition, restore }: { condition: Condition; restore: Tuple },
): Record[] {
    const file = readFile(file_name);

    const records = file.update(restore, condition);

    writeFile(file_name, file.body);

    return records;
}
