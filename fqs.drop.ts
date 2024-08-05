import fs from "fs";
import { code } from "./fqs.code";

export default function drop(table_name: string): void {
    if (fs.existsSync(table_name + ".csv")) {
        throw { code: code.EEXIST };
    }

    fs.unlinkSync(table_name + ".csv");
}
