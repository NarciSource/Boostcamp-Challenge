import fs from "fs";
import { glob } from "glob";
import BlobObject from "./Blob";
import crypto from "crypto";
import zlib from "zlib";

const [, , command, directoryPath, hashValue] = process.argv;

type Hash = string;
type Path = string;

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
        status(directoryPath);
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
function init(directoryPath: Path) {
    fs.mkdir(`${directoryPath}/.mit/objects`, { recursive: true }, (error) => {
        console.log(error);
    });
    fs.writeFileSync(`${directoryPath}/.mit/index`, "");
}

function writeHashDictionary(directoryPath: Path, hash: Hash, data: any) {
    try {
        fs.mkdirSync(`${directoryPath}/.mit/objects/${hash.substring(0, 8)}`, {
            recursive: true,
        });
        fs.writeFileSync(
            `${directoryPath}/.mit/objects/${hash.substring(0, 8)}/${hash.substring(8)}`,
            data.toString(),
        );
    } catch (error) {
        console.log(error);
    }
}

/**
 * 현재 디렉토리 아래의 전체 파일 탐색
 * https://www.npmjs.com/package/glob
 */
async function add(directoryPath: Path) {
    const files = await glob(`${directoryPath}/**/*`, { ignore: ["node_modules/**", ".mit/**"] });

    const curStaging: Hash[] = files.map((filePath) => hashObject(filePath, directoryPath));

    const hash = crypto.createHash("sha256");
    const curStagingHash = hash.update(curStaging.join(" ")).digest("hex");

    const preStagingHash = fs.readFileSync(`${directoryPath}/.mit/index`, "utf8");

    if (curStagingHash !== preStagingHash) {
        fs.writeFileSync(`${directoryPath}/.mit/index`, curStagingHash);

        writeHashDictionary(directoryPath, curStagingHash, curStaging);
    }
}

/**
 * 파일을 순회하며 blob객체 생성
 * blob 내용 zlib 압축
 * blob 객체 해싱 후 해시값 반환
 * https://nodejs.org/api/crypto.html
 * https://nodejs.org/api/zlib.html
 * sha256
 */
function hashObject(filePath: Path, directoryPath: Path): Hash {
    const fileSize = fs.statSync(filePath).size;
    const fileContent = fs.readFileSync(filePath);
    const compressedContent = zlib.deflateSync(fileContent);
    const blobObject = new BlobObject(fileSize, compressedContent);
    const hash = crypto.createHash("sha256");

    hash.update(blobObject.content);
    const hashCode = hash.digest("hex");

    writeHashDictionary(directoryPath, hashCode, hashCode);

    return hashCode;
}

async function status(directoryPath: Path): Promise<void> {
    const key = fs.readFileSync(`${directoryPath}/.mit/index`, "utf8");

    const staging = fs
        .readFileSync(
            `${directoryPath}/.mit/objects/${key.substring(0, 8)}/${key.substring(8)}`,
            "utf8",
        )
        .split(",");

    const files = await glob(`${directoryPath}/**/*`, { ignore: ["node_modules/**", ".mit/**"] });

    files
        .filter((filePath) => !staging.includes(hashObject(filePath, directoryPath)))
        .forEach((filePath) => {
            console.log(filePath);
        });
}
