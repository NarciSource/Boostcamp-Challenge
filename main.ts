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
    fs.writeFileSync(`${directoryPath}/.mit/index`, "");
}

/**
 * 현재 디렉토리 아래의 전체 파일 탐색
 * https://www.npmjs.com/package/glob
 */
async function add(directoryPath) {
    const files = await glob(`${directoryPath}/**/*`, { ignore: ["node_modules/**", ".mit/**"] });

    const curStaging = files.map((filePath) => hashObject(filePath, directoryPath));

    const hash = crypto.createHash("sha256");
    const curStagingHash = hash.update(curStaging.join(" ")).digest("hex");

    const preStagingHash = fs.readFileSync(`${directoryPath}/.mit/index`, "utf8");

    if (curStagingHash !== preStagingHash) {
        fs.writeFileSync(`${directoryPath}/.mit/index`, curStagingHash);
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

// 인덱스 파일의 바이너리 구조는 다음과 같습니다:

//     헤더 (48바이트):
//         Signature (4바이트): DIRC
//         Version (4바이트): 버전 정보 (일반적으로 2가 사용됨)
//         Checksum (4바이트): 헤더와 데이터에 대한 체크섬

//     인덱스 항목 (변동 크기):
//         File Mode (2바이트)
//         Object Name (20바이트, SHA-1 해시)
//         Stage (1바이트)
//         Timestamp (4바이트, UNIX 타임스탬프)
//         Size (4바이트)
//         Path Length (2바이트)
//         Path (변동 크기, NUL로 구분된 문자열)

//     체크섬 (20바이트):
//         Checksum: 인덱스 파일 전체에 대한 체크섬
