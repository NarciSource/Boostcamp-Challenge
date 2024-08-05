import fs from "fs";

export default function drop(table_name: string): void {
    fs.unlinkSync(table_name + ".csv");
}
