import fs from "fs";
import { glob, Ignore } from "glob";

const [, , command, directoryPath, hashValue] = process.argv;

/**
 * init 디렉토리명
 * add 디렉토리명
 * status 디렉토리명
 * commit 디렉토리명
 * log 디렉토리명
 * restore 디렉토리명 {8자리 | 64자리 커밋해시값}
 */
switch (command) {
    case "init":
        init(directoryPath);
        break;
    case "add":
        add(directoryPath);
        break;
    case "status":
        break;
    case "log":
        break;
    case "restore":
        break;
    default:
        break;
}

/**
 * 디렉토리명/.mit/objects/
 * 디렉토리명/.mit/index/
 * https://www.geeksforgeeks.org/node-js-fs-mkdir-method/
 */
function init(directoryPath) {
    fs.mkdir(`${directoryPath}/.mit/objects`, { recursive: true }, (error) => {
        console.log(error);
    });
    fs.mkdir(`${directoryPath}/.mit/index`, { recursive: true }, (error) => {
        console.log(error);
    });
}

/**
 * 현재 디렉토리 아래의 전체 파일 탐색
 * https://www.npmjs.com/package/glob
 */
async function add(directoryPath) {
    const files = await glob(`${directoryPath}/**/*`, { ignore: ["node_modules/**", "test/**"] });
    console.log(files);
}
