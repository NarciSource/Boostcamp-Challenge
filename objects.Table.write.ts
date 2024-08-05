import fs from "fs";
import Papa from "papaparse";
import { Body } from "./objects.Table.type";

export default function writeTable(table_name: string, body: Body) {
    try {
        const save_csv = Papa.unparse(body, { quote: false });
        fs.writeFileSync(table_name + ".csv", save_csv);

        console.log("<<<<<<<<");
        console.log(save_csv);
    } catch (e) {
        console.error(e);
    }
}
