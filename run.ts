import fs from "fs";
import { create } from "./fqs.create";
import { insert } from "./fqs.insert";
import delete_query from "./fqs.delete";

const fqs = {
    create,
    insert,
    delete: delete_query,
};

export default function run(path: string) {
    try {
        const [query_type, filename, ext] = path.split(".");
        const file = fs.readFileSync(path, "utf8");

        fqs[query_type](file);
    } catch (e) {
        console.log(e);
        console.error("파일이 존재하지 않습니다.");
    }
}
