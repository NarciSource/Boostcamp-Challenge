export default function parse(lines: string[]): [string, string] {
    const column_regex = /Column:\s*(\w+)/;
    const value_regex = /Value:\s*"(\w+)"/;

    const [, restore_column] = column_regex.exec(lines[1]);
    const [, restore_value] = value_regex.exec(lines[2]);

    return [restore_column, restore_value];
}
