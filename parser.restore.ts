export default function parse(column_line: string, value_line: string): [string, string] {
    const column_regex = /Column:\s*(\w+)/;
    const value_regex = /Value:\s*"(\w+)"/;

    const [, restore_column] = column_regex.exec(column_line);
    const [, restore_value] = value_regex.exec(value_line);

    return [restore_column, restore_value];
}
