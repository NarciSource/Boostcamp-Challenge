import fs from "fs";
import { glob } from "glob";
import { Path } from "./main";
import { hashObject } from "./hash";
import BlobObject from "./Object.Blob";
import TreeObject from "./Object.Tree";

/**
 * 현재 디렉토리 아래의 전체 파일 탐색
 * https://www.npmjs.com/package/glob
 */
export default async function add(directoryPath: Path) {
    const filePaths = await glob(`${directoryPath}/**/*`, {
        ignore: ["node_modules/**", ".mit/**"],
    });

    const blobObjects = filePaths
        .map((filePath: Path) => [filePath, fs.readFileSync(filePath)])
        .map(([filePath, fileContent]: [string, Buffer]) => new BlobObject(filePath, fileContent));

    for (const blobObject of blobObjects) {
        hashObject(blobObject, directoryPath, true);
    }

    const curStaging = new TreeObject("staging", blobObjects);
    hashObject(curStaging, directoryPath, false);

    const preStagingHash = fs.readFileSync(`${directoryPath}/.mit/index`, "utf8");

    if (curStaging.hash !== preStagingHash) {
        fs.writeFileSync(`${directoryPath}/.mit/index`, curStaging.hash);
    }
}
