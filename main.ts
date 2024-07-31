import fs from "fs";
import { glob } from "glob";
import BlobObject from "./Blob";
import crypto from "crypto";
import zlib from "zlib";

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
    const files = await glob(`${directoryPath}/**/*`, { ignore: ["node_modules/**", ".mit/**"] });

    for (const filePath of files) {
        console.log(hashObject(filePath, directoryPath));
    }
}

/**
 * 파일을 순회하며 blob객체 생성
 * blob 내용 zlip 압축
 * blob 객체 해싱 후 해시값 반환
 * https://nodejs.org/api/crypto.html
 * https://nodejs.org/api/zlib.html
 * sha256
 */
function hashObject(filePath, directoryPath): string {
    const fileSize = fs.statSync(filePath).size;
    const fileContent = fs.readFileSync(filePath);
    const compressedContent = zlib.deflateSync(fileContent);
    const blobObject = new BlobObject(fileSize, compressedContent);
    const hash = crypto.createHash("sha256");

    hash.update(blobObject.content);
    const hashCode = hash.digest("hex");

    try {
        fs.mkdirSync(`${directoryPath}/.mit/objects/${hashCode.substring(0, 8)}`, {
            recursive: true,
        });
        fs.writeFileSync(
            `${directoryPath}/.mit/objects/${hashCode.substring(0, 8)}/${hashCode.substring(8)}`,
            blobObject.content,
        );
    } catch (error) {
        console.log(error);
    }

    return hashCode;
}
