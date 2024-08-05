import { zip } from "./utils";
import { Record } from "./parser.type";
import restore_parse from "./parser.restore";

export default function parse(lines: string[]): Record {
    const column_lines = lines.slice(0, lines.length / 2);
    const value_lines = lines.slice(lines.length / 2);
    const tuple_lines = [...zip(column_lines, value_lines)] as [string, string][];

    const record: Record = tuple_lines
        .map(restore_parse)
        .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {} as Record);

    return record;
}
