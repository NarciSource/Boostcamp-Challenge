import { Condition } from "./parser.type";

export default function parse(line: string): Condition {
    const condition_regex = /Condition:\s*(\w+)(=|>|<)(\d+|"\w+")/i;

    const [, name, operand, value] = condition_regex.exec(line) as unknown as [
        any,
        string,
        "=" | ">" | "<",
        string | number,
    ];
    return { name, value, operand };
}
