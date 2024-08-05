import fs from "fs";

export default function drop(table_name: string): void {
    if (fs.existsSync(table_name + ".csv")) {
        throw { code: "EEXIST" };
    }

    fs.unlinkSync(table_name + ".csv");
}
