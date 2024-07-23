import { parse_filepath } from "./parse_filepath";
import path_examples_windows from "./parse_filepath.examples.windows";
import path_examples_linux from "./parse_filepath.examples.linux";

let path_examples;
if (process.platform === "win32") {
    path_examples = path_examples_windows;
}
if (process.platform === "linux") {
    path_examples = path_examples_linux;
}

describe("Filepath Regex Test", () => {
    it.each(path_examples)("정규식 테스트", (path_example) => {
        const result = parse_filepath(path_example.input);

        expect(result).toStrictEqual(path_example.output);
    });
});
