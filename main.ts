import fs from "fs";
import { glob } from "glob";
import init from "./init";
import add from "./add";

const [, , command, directoryPath, hashValue] = process.argv;

export type Hash = string;
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
        add(directoryPath);
        break;
    case "status":
        status(directoryPath);
        break;
    case "log":
        break;
    case "restore":
        break;
    default:
        break;
}

function readHashDictionary(directoryPath: Path, key: Hash): any {
    return fs.readFileSync(
        `${directoryPath}/.mit/objects/${key.substring(0, 8)}/${key.substring(8)}`,
        "utf8",
    );
}

async function status(directoryPath: Path): Promise<void> {
    const key = fs.readFileSync(`${directoryPath}/.mit/index`, "utf8");

    const staging = readHashDictionary(directoryPath, key).split(",");

    const files = await glob(`${directoryPath}/**/*`, { ignore: ["node_modules/**", ".mit/**"] });

    files
        .filter((filePath) => !staging.includes(hashObject(filePath, directoryPath)))
        .forEach((filePath) => {
            console.log(filePath);
        });
}
