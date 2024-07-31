import init from "./commands.init";
import add from "./commands.add";
import status from "./commands.status";

const [, , command, directoryPath, hashValue] = process.argv;

export type Path = string;

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
        init(directoryPath as Path);
        break;
    case "add":
        add(directoryPath as Path);
        break;
    case "status":
        status(directoryPath as Path);
        break;
    case "log":
        break;
    case "restore":
        break;
    default:
        break;
}
