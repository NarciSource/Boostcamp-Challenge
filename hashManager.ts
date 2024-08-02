import crypto from "crypto";
import { readObjects, writeObjects } from "./fileSystem";
import MitObject from "./Object";

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
export function hashObject(blobObject: MitObject, compress = false): Hash {
    if (compress) {
        blobObject.compress();
    }

    const hashCode = blobObject.hash;

    writeHashDictionary(hashCode, blobObject);

    return hashCode;
}

export function writeHashDictionary(hash: Hash, data: MitObject): void {
    writeObjects(hash.substring(0, 8), hash.substring(8), data.content);
}

export function readHashDictionary(key: Hash): any {
    return readObjects(key);
}
