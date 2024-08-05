import { Header } from "./objects.Request";

export default function parse(raw: string): Header {
    const header_regex = /(\w+) (\w+) (\w+)/;

    const [, query_type, table_name, bttp] = header_regex.exec(raw);

    return { query_type, table_name, bttp };
}
