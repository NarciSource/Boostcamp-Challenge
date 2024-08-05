import readFile from "./File.read";
import writeFile from "./File.write";
import { Record } from "./File.type";

export default function insert(file_name: string, record: Record): Record {
    const file = readFile(file_name);

    file.insert(record);

    writeFile(file_name, file.body);

    return record;
}
