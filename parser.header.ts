import { Header } from "./bttp.Request.type";

export default function parse(raw: string): Header {
    const header_regex = /(\w+) (\w+) (\w+)/;

    const [, query_type, file_name, bttp] = header_regex.exec(raw);

    return { query_type, file_name, bttp };
}
