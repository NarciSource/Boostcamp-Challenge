import fs from "fs";
import { glob } from "glob";
import crypto from "crypto";
import zlib from "zlib";
import { Hash, Path } from "./main";
import BlobObject from "./Blob";

function writeHashDictionary(directoryPath: Path, hash: Hash, data: any): void {
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

/**
 * 현재 디렉토리 아래의 전체 파일 탐색
 * https://www.npmjs.com/package/glob
 */
export default async function add(directoryPath: Path) {
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
