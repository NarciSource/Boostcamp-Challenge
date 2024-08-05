import { Body, Header } from "./bttp.Response.type";
import readTable from "./File.read";

export default function select(
    table_name: string,
    [condition_column, condition_value]: [string, string],
): [Header, Body?] {
    const file = readTable(table_name);

    const fields = file.body.filter((record) => {
        return record[condition_column] === condition_value;
    });

    if (fields.length > 0) {
        const data = JSON.stringify(fields);

        const header: Header = {
            code: 200,
            message: "OK",
            "Row-Count": fields.length,
            "Content-Type": "Text/JSON",
            "Content-Length": data.length,
        };
        const body = { data };

        return [header, body];
    } else {
        const header: Header = { code: 100, message: "Trying", "Row-Count": 0 };

        return [header];
    }
}
