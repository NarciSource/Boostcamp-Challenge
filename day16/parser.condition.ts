import { Condition } from "./parser.type";

export default function parse(line: string): Condition {
    const condition_regex = /Condition:\s*(\w+)(=|>|<)(?:(\d+)|"?(\w+)"?)/i;

    const [, name, operand, number, str] = condition_regex.exec(line);
    const value = number || str;

    return { name, value, operand } as Condition;
}
