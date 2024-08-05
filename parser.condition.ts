export default function parse(line: string): [string, string, string] {
    const condition_regex = /Condition:\s*(\w+)(=|>|<)(\d+|"\w+")/i;

    const [, condition_column, operand, condition_value] = condition_regex.exec(line);
    return [condition_column, condition_value, operand];
}
