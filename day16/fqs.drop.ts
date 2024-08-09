import fs from "fs";
import { code } from "./fqs.code";

export default function drop(file_name: string): void {
    if (!fs.existsSync(file_name + ".csv")) {
        throw { code: code.ENOENT };
    }

    fs.unlinkSync(file_name + ".csv");
}
