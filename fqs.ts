import create from "./fqs.create";
import delete_query from "./fqs.delete";
import drop from "./fqs.drop";
import insert from "./fqs.insert";
import select from "./fqs.select";
import update from "./fqs.update";
import Request from "./bttp.Request";
import Response from "./bttp.Response";
import { Header } from "./bttp.Response.type";

const query = {
    create,
    insert,
    delete: delete_query,
    update,
    select,
    drop,
};

export default function fqs(request: Request): Response {
    const type = request.header.query_type.toLocaleLowerCase();

    let header: Header;
    let body: Body;
    try {
        [header, body] = query[type](request.header.table_name, request.body);
    } catch (error) {
        if (error.code === "ENOENT") {
            header = { code: 300, message: "Table not found" };
        } else {
            header = { code: 500, message: "Request format error" };
        }
    }
    const response = new Response(header, body);
    return response;
}
