import fs from "fs";
import header_parse from "./parser.header";
import schema_parse from "./parser.schema";
import condition_parse from "./parser.condition";
import Request from "./bttp.Request";
import record_parse from "./parser.record";
import restore_parse from "./parser.restore";

export default async function run(path: string) {
    try {
        const [query_type, filename, ext] = path.split(".");
        const raw = fs.readFileSync(path, "utf8");

        console.log(">>>>>>>>");
        console.log(raw);

        const header = header_parse(raw.split("\r\n")[0]);

        let body: any;
        switch (query_type) {
            case "create":
                body = schema_parse(raw.split("\r\n").slice(1));
                break;
            case "delete":
                body = condition_parse(raw.split("\r\n")[1]);
                break;
            case "insert":
                body = record_parse(raw.split("\r\n").slice(1));
                break;
            case "select":
                body = condition_parse(raw.split("\r\n")[1]);
                break;
            case "update":
                body = {
                    condition: condition_parse(raw.split("\r\n")[3]),
                    restore: restore_parse(raw.split("\r\n").slice(1, 3) as [string, string]),
                };
                break;
        }

        const request = new Request(header, body);
        const response = await request.post();

        console.log("<<<<<<<<");
        for (const [key, value] of Object.entries(response.header)) {
            console.log(key, value);
        }
        if (response.body) {
            console.log();
            if (response.header["Content-Type"] === "Text/JSON") {
                console.log(JSON.parse(response.body.data));
            } else if (response.body.data) {
                console.log(response.body.data);
            }
        }
    } catch (error) {
        switch (error.code) {
            case "ENOENT":
                console.error("파일이 존재하지 않습니다.");
                break;
            default:
                console.error("파일이 올바르지 않은 포맷입니다.");
        }
    }
    console.log();
}
