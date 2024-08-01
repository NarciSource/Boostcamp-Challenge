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
}
