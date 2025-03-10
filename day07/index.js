import Path from "./Path.js";

var path = new Path("/home/user/boost/camp/challenge/day8/problem.md");

path.root = "/";
path.base = "problem.md";
path.ext = ".md";
path.name = "problem";
path.lastDirectory = "day12";
path.components = [
    "/",
    "home",
    "user",
    "boost",
    "camp",
    "challenge",
    "day8",
    "problem.md",
];

path.absolute_string = "/home/user/boost/camp/challenge/day8/problem.md";

path.append_component("base");
path.append_component("camp");
//path.absolute_string = "/home/user/boost/camp/challenge/day12/base/camp/problem.md"
path.delete_last_component();
//path.absolute_string = "/home/user/boost/camp/challenge/day12/base/problem.md"

const path1 = new Path("/first/second/last/problem.md");

console.log(path.stringify());
console.log(path1.stringify());
