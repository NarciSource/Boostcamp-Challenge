import create from "./fqs.create";
import delete_query from "./fqs.delete";
import drop from "./fqs.drop";
import insert from "./fqs.insert";
import select from "./fqs.select";
import update from "./fqs.update";
import Request from "./bttp.Request";

const query = {
    create,
    insert,
    delete: delete_query,
    update,
    select,
    drop,
};

export default function fqs(request: Request) {
    const type = request.header.query_type.toLocaleLowerCase();

    query[type](request.header.table_name, request.body);
}
