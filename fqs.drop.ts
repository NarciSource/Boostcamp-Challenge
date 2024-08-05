import fs from "fs";
import header_parse from "./headerParse";

export default function drop(raw: string) {
    const header = header_parse(raw.split("\r\n")[0]);

    fs.unlinkSync(header.table_name + ".csv");
}
