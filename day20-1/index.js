import readline from "readline";
import { segments } from "./segments.js";
import { zip } from "./utils.js";

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

r1.on("line", async (input) => {
    const [param0, param1, param2, param3] = input.split(",");

    try {
        const display_board = make_7segment(param0, param1, param2, param3);

        for (const line of display_board) {
            console.log(line.join(""));
        }
    } catch (error) {
        console.error(error);
    }
});

const combine_lines = (delimiter) => (acc, cur) =>
    [...zip(acc, cur)].map(([line1, line2]) => [...line1, delimiter, ...line2]);

const fill_segments = (segment, non_segment) => (line) =>
    line.map((x) => (x === 1 ? segment : x === 0 ? non_segment : x));

function make_7segment(number_str, segment, non_segment, delimiter) {
    if (isNaN(number_str)) {
        throw "ERROR_PARAM0";
    }
    if (!number_str || !segment || !non_segment || !delimiter) {
        throw "ERROR_COMMA";
    }

    return number_str
        .split("")
        .map((number) => segments[number])
        .reduce(combine_lines(delimiter))
        .map(fill_segments(segment, non_segment));
}
