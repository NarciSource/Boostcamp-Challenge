import fs from "fs";

export default function drop(table_name: string) {
    fs.unlinkSync(table_name + ".csv");
}
