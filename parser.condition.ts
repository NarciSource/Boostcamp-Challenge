export default function parse(line: string): [string, string] {
    const condition_regex = /Condition:\s*(\w+)=(\w+)/;

    const [, condition_column, condition_value] = condition_regex.exec(line);
    return [condition_column, condition_value];
}
