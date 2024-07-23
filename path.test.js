import path_examples_windows from "./examples.windows.js";
import path_examples_linux from "./examples.linux.js";
import Path from "./path";

let path_examples;
if (process.platform === "win32") {
    path_examples = path_examples_windows;
}
if (process.platform === "linux") {
    path_examples = path_examples_linux;
}

describe("Filepath Regex Test", () => {
    it.each(path_examples)("정규식 테스트", (path_example) => {
        // given
        const { root, name, ext, components } = path_example.output;

        // when
        const result = Path.parse_filepath(path_example.input);

        // then
        expect(result).toStrictEqual({ root, name, ext, components });
    });
});

describe("getter/setter 테스트", () => {
    it("base getter/setter 테스트", () => {
        const path = new Path(path_examples[0].input);

        path.base = "Hello.world";

        expect(path.name).toBe("Hello");
        expect(path.ext).toBe("world");
    });

    it("components 테스트", () => {
        const path = new Path(path_examples[0].input);

        path.components = ["a", "b"];

        expect(path.components).toStrictEqual(["a", "b"]);
        expect(path.components.length).toBe(2);
    });
});
