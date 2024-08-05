import Request from "./bttp.Request";
import Response from "./bttp.Response";
import { Header, Body } from "./bttp.Response.type";
import fqs from "./fqs";

export default async function server(request: Request): Promise<Response> {
    if (request.header.bttp) {
        const type = request.header.query_type.toLocaleLowerCase();

        let header: Header;
        let body: Body;
        try {
            const data = await fqs(type, request.header.table_name, request.body);
            body = { data };

            header = {
                code: 200,
                message: "OK",
            };

            if (body) {
                header = {
                    ...header,
                    "Content-Type": "Text/JSON",
                    "Content-Length": body.data.length,
                };
            }
        } catch (error) {
            switch (error.code) {
                case "ENOENT":
                    header = { code: 300, message: "Table not found" };
                    break;
                case "INVALID_FIELD_COUNT":
                    header = { code: 400, message: "Column not matched" };
                    break;
                case "INVALID_FIELD_MATCHING":
                    header = { code: 401, message: "Column not found" };
                    break;
                case "NOT_FOUND_RECORD":
                    if (type === "select") {
                        header = { code: 100, message: "Trying" };
                    } else {
                        header = { code: 402, message: "Row not found" };
                    }
                    break;
                case "EEXIST":
                    header = { code: 409, message: "Table already exists" };
                    break;
                default:
                    header = { code: 500, message: "Request format error" };
                    console.error(error);
            }
        }
        const response = new Response(header, body);
        return response;
    }
}
