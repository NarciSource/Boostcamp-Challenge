import fs from "fs";
import crypto from "crypto";
import BlobObject from "./Blob";
import { Path } from "./main";
import TreeObject from "./TreeObject";

export type Hash = string;

export function hashing(data: Buffer): Hash {
    const hash = crypto.createHash("sha256");
    hash.update(data);
    const hashCode = hash.digest("hex");
    return hashCode;
}

/**
 * 파일을 순회하며 blob객체 생성
 * blob 내용 zlib 압축
 * blob 객체 해싱 후 해시값 반환
 * https://nodejs.org/api/crypto.html
 * https://nodejs.org/api/zlib.html
 * sha256
 */
export function hashObject(
    blobObject: BlobObject | TreeObject,
    directoryPath: Path,
    compress = false,
): Hash {
    if (compress) {
        blobObject.compress();
    }

    const hashCode = blobObject.hash;

    writeHashDictionary(directoryPath, hashCode, blobObject);

    return hashCode;
}

export function writeHashDictionary(
    directoryPath: Path,
    hash: Hash,
    data: BlobObject | TreeObject,
): void {
    try {
        fs.mkdirSync(`${directoryPath}/.mit/objects/${hash.substring(0, 8)}`, {
            recursive: true,
        });
        fs.writeFileSync(
            `${directoryPath}/.mit/objects/${hash.substring(0, 8)}/${hash.substring(8)}`,
            data.content,
        );
    } catch (error) {
        console.log(error);
    }
}

export function readHashDictionary(directoryPath: Path, key: Hash): any {
    return fs.readFileSync(
        `${directoryPath}/.mit/objects/${key.substring(0, 8)}/${key.substring(8)}`,
        "utf8",
    );
}
