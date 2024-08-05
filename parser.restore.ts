import { Tuple } from "./parser.type";

export default function parse([column_line, value_line]: [string, string]): Tuple {
    const column_regex = /Column:\s*(\w+)/i;
    const value_regex = /Value:\s*(?:(\d+)|"?(\w+)"?)/i;

    const [, name] = column_regex.exec(column_line);
    const [, number, str] = value_regex.exec(value_line);
    const value = number || str;

    return { name, value };
}
