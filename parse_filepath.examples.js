export default path_examples = [
    {
        input: "/home/user/boost/camp/challenge/day8/problem.md",
        output: {
            root: "C:",
            base: "problem.md",
            name: "problem",
            ext: ".md",
            components: [
                "C:",
                "home",
                "user",
                "boost",
                "camp",
                "challenge",
                "day8",
            ],
            absolute_string:
                "C:/home/user/boost/camp/challenge/day8/problem.md",
        },
    },
    {
        input: "C:\\home\\user\\boost\\camp\\challenge\\day8\\problem.md",
        output: {
            root: "C:",
            base: "problem.md",
            name: "problem",
            ext: ".md",
            components: [
                "C:",
                "home",
                "user",
                "boost",
                "camp",
                "challenge",
                "day8",
            ],
            absolute_string:
                "C:/home/user/boost/camp/challenge/day8/problem.md",
        },
    },
    {
        input: "/home/user/Documents/Project/file.txt",
        output: {
            root: "C:",
            base: "file.txt",
            name: "file",
            ext: ".txt",
            components: ["C:", "home", "user", "Documents", "Project"],
            absolute_string: "C:/home/user/Documents/Project/file.txt",
        },
    },
    {
        input: "./boost/camp",
        output: {
            root: "C:",
            base: "camp",
            name: "camp",
            ext: undefined,
            components: [
                "C:",
                "Users",
                "jwch1",
                "Repository",
                "bootstcamp",
                "day07",
                "boost",
            ],
            absolute_string:
                "C:/Users/jwch1/Repository/bootstcamp/day07/boost/camp",
        },
    },
    {
        input: "../user/boost/camp",
        output: {
            root: "C:",
            base: "camp",
            name: "camp",
            ext: undefined,
            components: [
                "C:",
                "Users",
                "jwch1",
                "Repository",
                "bootstcamp",
                "user",
                "boost",
            ],
            absolute_string:
                "C:/Users/jwch1/Repository/bootstcamp/user/boost/camp",
        },
    },
    {
        input: "boost/camp",
        output: {
            root: "C:",
            base: "camp",
            name: "camp",
            ext: undefined,
            components: [
                "C:",
                "Users",
                "jwch1",
                "Repository",
                "bootstcamp",
                "day07",
                "boost",
            ],
            absolute_string:
                "C:/Users/jwch1/Repository/bootstcamp/day07/boost/camp",
        },
    },
    {
        input: "/home",
        output: {
            root: "C:",
            base: "home",
            name: "home",
            ext: undefined,
            components: ["C:"],
            absolute_string: "C:/home",
        },
    },
    {
        input: "home",
        output: {
            root: "C:",
            base: "home",
            name: "home",
            ext: undefined,
            components: [
                "C:",
                "Users",
                "jwch1",
                "Repository",
                "bootstcamp",
                "day07",
            ],
            absolute_string: "C:/Users/jwch1/Repository/bootstcamp/day07/home",
        },
    },
];
