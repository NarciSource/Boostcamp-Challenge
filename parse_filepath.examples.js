export default path_examples = [
    {
        input: "/home/user/boost/camp/challenge/day8/problem.md",
        output: {
            root: "/",
            components: ["home", "user", "boost", "camp", "challenge", "day8"],
            name: "problem",
            ext: ".md",
        },
    },
    {
        input: "C:\\home\\user\\boost\\camp\\challenge\\day8\\problem.md",
        output: {
            root: "C:\\",
            components: ["home", "user", "boost", "camp", "challenge", "day8"],
            name: "problem",
            ext: ".md",
        },
    },
    {
        input: "/home/user/Documents/Project/file.txt",
        output: {
            root: "/",
            components: ["home", "user", "Documents", "Project"],
            name: "file",
            ext: ".txt",
        },
    },
    {
        input: "./boost/camp",
        output: {
            root: "./",
            components: ["boost"],
            name: "camp",
            ext: undefined,
        },
    },
    {
        input: "../user/boost/camp",
        output: {
            root: "../",
            components: ["user", "boost"],
            name: "camp",
            ext: undefined,
        },
    },
    {
        input: "boost/camp",
        output: {
            root: undefined,
            components: ["boost"],
            name: "camp",
            ext: undefined,
        },
    },
    {
        input: "/home",
        output: {
            root: "/",
            components: undefined,
            name: "home",
            ext: undefined,
        },
    },
    {
        input: "home",
        output: {
            root: undefined,
            components: undefined,
            name: "home",
            ext: undefined,
        },
    },
];
