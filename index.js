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

path.absoluteString = "/home/user/boost/camp/challenge/day8/problem.md";

path.append_component("base");
path.append_component("camp");
//path.absoluteString = "/home/user/boost/camp/challenge/day12/base/camp/problem.md"
path.deleteLast_component();
//path.absoluteString = "/home/user/boost/camp/challenge/day12/base/problem.md"

const path1 = new Path("/first/second/last/problem.md");

console.log(path, path1);
