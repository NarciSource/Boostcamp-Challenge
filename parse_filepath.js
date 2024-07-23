const path_regex =
    /^(\/|\.\/|\.\.\/|\w:\\)?([^.]+(?:\/|\\))?([^./]+)(?:\.(\w+))?$/;

const path_examples = [
    "/home/user/boost/camp/challenge/day8/problem.md",
    "C:\\home\\user\\boost\\camp\\challenge\\day8\\problem.md",
    "/home/user/Documents/Project/file.txt",
    "./boost/camp",
    "../user/boost/camp",
    "boost/camp",
    "/home",
    "home",
];

for (const path_example of path_examples) {
    console.log(regex.exec(path_example));
}
