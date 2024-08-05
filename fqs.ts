import create from "./fqs.create";
import delete_query from "./fqs.delete";
import drop from "./fqs.drop";
import insert from "./fqs.insert";
import select from "./fqs.select";
import update from "./fqs.update";

const query = {
    create,
    insert,
    delete: delete_query,
    update,
    select,
    drop,
};

export default async function fqs(type: string, file_name: string, arg: any): Promise<string> {
    const data = query[type](file_name, arg);

    return JSON.stringify(data);
}
