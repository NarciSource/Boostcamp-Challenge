import { Path, readDirectory, readFile, readIndex, writeIndex } from "./fileSystem";
import { hashObject } from "./hashManager";
import TreeObject from "./Object.Tree";

/**
 * 현재 디렉토리 아래의 전체 파일 탐색
 * https://www.npmjs.com/package/glob
 */
export default async function add() {
    const filePaths = await readDirectory();

    const blobObjects = filePaths.map((filePath: Path) => readFile(filePath));

    for (const blobObject of blobObjects) {
        hashObject(blobObject, true);
    }

    const curStaging = new TreeObject("staging", blobObjects);
    hashObject(curStaging, false);

    const preStagingHash = readIndex();

    if (curStaging.hash !== preStagingHash) {
        writeIndex(curStaging.hash);
    }
}
