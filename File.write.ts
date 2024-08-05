import fs from "fs";
import Papa from "papaparse";
import { Body } from "./File.type";

export default function writeFile(file_name: string, body: Body) {
    try {
        const save_csv = Papa.unparse(body, { quote: false });
        fs.writeFileSync(file_name + ".csv", save_csv);

        console.log("<<<<<<<<");
        console.log(save_csv);
    } catch (e) {
        console.error(e);
    }
}
