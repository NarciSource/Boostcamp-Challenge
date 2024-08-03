import { readObjects, writeObjects } from "./fileSystem";
import Hash from "./collections.Hash";
import MitObject from "./objects.Base";
import BlobObject from "./objects.Blob";
import TreeObject from "./objects.Tree";

/**
 * 파일을 순회하며 blob객체 생성
 * blob 내용 zlib 압축
 * blob 객체 해싱 후 해시값 반환
 * https://nodejs.org/api/crypto.html
 * https://nodejs.org/api/zlib.html
 * sha256
 */
export function hashObject(mitObject: MitObject, compress = false): Hash {
    if (mitObject instanceof TreeObject) {
        mitObject.childrenTree
            .filter((each) => each instanceof TreeObject)
            .forEach((tree) => hashObject(tree));
    }

    if (compress) {
        mitObject.compress();
    }

    const hash = mitObject.hash;

    writeObjects(hash, mitObject.content);

    return hash;
}

export function readHashDictionary(key: Hash, parser: Function): any {
    try {
        const blobObject = new BlobObject(null, readObjects(key));
        try {
            blobObject.decompress();
        } catch (e) {}

        return parser(blobObject.content.toString());
    } catch (e) {
        return null;
    }
}
