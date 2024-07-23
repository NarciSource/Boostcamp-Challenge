export default path_examples = [
    {
        input: "/home/user/boost/camp/challenge/day8/problem.md",
        output: {
            root: "/",
            base: "problem.md",
            name: "problem",
            ext: ".md",
            components: ["home", "user", "boost", "camp", "challenge", "day8"],
        },
    },
    {
        input: "C:\\home\\user\\boost\\camp\\challenge\\day8\\problem.md",
        output: {
            root: "C:\\",
            base: "problem.md",
            name: "problem",
            ext: ".md",
            components: ["home", "user", "boost", "camp", "challenge", "day8"],
        },
    },
    {
        input: "/home/user/Documents/Project/file.txt",
        output: {
            root: "/",
            base: "file.txt",
            name: "file",
            ext: ".txt",
            components: ["home", "user", "Documents", "Project"],
        },
    },
    {
        input: "./boost/camp",
        output: {
            root: "./",
            base: "camp",
            name: "camp",
            ext: undefined,
            components: ["boost"],
        },
    },
    {
        input: "../user/boost/camp",
        output: {
            root: "../",
            base: "camp",
            name: "camp",
            ext: undefined,
            components: ["user", "boost"],
        },
    },
    {
        input: "boost/camp",
        output: {
            root: undefined,
            base: "camp",
            name: "camp",
            ext: undefined,
            components: ["boost"],
        },
    },
    {
        input: "/home",
        output: {
            root: "/",
            base: "home",
            name: "home",
            ext: undefined,
            components: undefined,
        },
    },
    {
        input: "home",
        output: {
            root: undefined,
            base: "home",
            name: "home",
            ext: undefined,
            components: undefined,
        },
    },
];
