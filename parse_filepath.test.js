import { parse_filepath } from "./parse_filepath";
import path_examples from "./parse_filepath.examples";

describe("Filepath Regex Test", () => {
    it.each(path_examples)("정규식 테스트", (path_example) => {
        const result = parse_filepath(path_example.input);

        //console.log(path_example.input)
        //console.log(result)
        expect(result).toStrictEqual(path_example.output);
    });
});
