import create from "./fqs.create";
import delete_query from "./fqs.delete";
import drop from "./fqs.drop";
import insert from "./fqs.insert";
import select from "./fqs.select";
import update from "./fqs.update";
import Request from "./bttp.Request";
import Response from "./bttp.Response";

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

    try {
        const [header, body] = query[type](request.header.table_name, request.body);

        const response = new Response(header, body);
        return response;
    } catch (e) {}
}
