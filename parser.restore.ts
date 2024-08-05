import { Tuple } from "./File.type";

export default function parse([column_line, value_line]: [string, string]): Tuple {
    const column_regex = /Column:\s*(\w+)/;
    const value_regex = /Value:\s*(\d+|"\w+")/;

    const [, name] = column_regex.exec(column_line);
    const [, value] = value_regex.exec(value_line);

    return { name, value };
}
