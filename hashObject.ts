import { readObjects, writeObjects } from "./fileSystem";
import { Hash } from "./hashManager";
import MitObject from "./Object";

/**
 * 파일을 순회하며 blob객체 생성
 * blob 내용 zlib 압축
 * blob 객체 해싱 후 해시값 반환
 * https://nodejs.org/api/crypto.html
 * https://nodejs.org/api/zlib.html
 * sha256
 */
export function hashObject(mitObject: MitObject, compress = false): Hash {
    if (compress) {
        mitObject.compress();
    }

    const hashCode = mitObject.hash;

    writeHashDictionary(hashCode, mitObject);

    return hashCode;
}

export function writeHashDictionary(hash: Hash, data: MitObject): void {
    writeObjects(hash.substring(0, 8), hash.substring(8), data.content);
}

export function readHashDictionary(key: Hash): any {
    try {
        return readObjects(key);
    } catch (e) {
        return null;
    }
}
