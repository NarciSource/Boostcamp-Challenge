import { readDirectory, readFile, readIndex, writeIndex } from "./fileSystem";
import { hashObject } from "./hashObject";
import stagingArea from "./Object.StagingArea";

/**
 * 현재 디렉토리 아래의 전체 파일 탐색
 * https://www.npmjs.com/package/glob
 */
export default async function add() {
    const filePaths = await readDirectory();

    const blobObjects = filePaths.map(readFile);

    // compress and write
    for (const blobObject of blobObjects) {
        hashObject(blobObject, true);
    }

    // staging update
    const curStaging = stagingArea.update(blobObjects);
    hashObject(curStaging, false);

    const preStagingHash = readIndex();

    // diff
    if (curStaging.hash !== preStagingHash) {
        // update
        writeIndex(curStaging.hash);
    }
}
