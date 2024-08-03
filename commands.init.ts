import chalk from "chalk";
import { writeCommits, writeDirectory, writeHEAD, writeIndex } from "./fileSystem";

/**
 * 디렉토리명/.mit/objects/
 * 디렉토리명/.mit/index/
 * https://www.geeksforgeeks.org/node-js-fs-mkdir-method/
 */
export default function init() {
    writeDirectory("objects");
    writeIndex("");
    writeHEAD("");
    writeCommits([]);

    console.log(
        chalk.red(
            `Initialized empty mit repository in ${__dirname}${
                !process.argv[3] || process.argv[3] === "." ? "" : "\\" + process.argv[3] + "\\"
            }\\.mit`,
        ),
    );
}
