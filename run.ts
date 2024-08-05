import fs from "fs";
import header_parse from "./parser.header";
import schema_parse from "./parser.schema";
import condition_parse from "./parser.condition";
import Request from "./bttp.Request";
import record_parse from "./parser.record";
import restore_parse from "./parser.restore";
import Response from "./bttp.Response";

export default function run(path: string) {
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
                    restore: restore_parse(raw.split("\r\n").slice(1, 3)),
                };
                break;
        }

        const callback = (response: Response) => {
            console.log("<<<<<<<<");
            console.log(response.header.code, response.header.message);
            if (response.body) {
                console.log(response.body);
            }
        };

        const request = new Request(header, body);
        request.post(callback);
    } catch (e) {
        console.log(e);
        console.error("파일이 존재하지 않습니다.");
    }
}
