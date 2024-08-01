import fs from "fs";
import { glob } from "glob";
import crypto from "crypto";
import { Path } from "./main";
import { readFile } from "./fileSystem";
import { hashObject, writeHashDictionary, Hash } from "./hash";
import BlobObject from "./Blob";

/**
 * 현재 디렉토리 아래의 전체 파일 탐색
 * https://www.npmjs.com/package/glob
 */
export default async function add(directoryPath: Path) {
    const filePaths = await glob(`${directoryPath}/**/*`, {
        ignore: ["node_modules/**", ".mit/**"],
    });

    const curStaging: Hash[] = filePaths
        .map((filePath) => readFile(filePath))
        .map(([fileContent, fileSize]) => new BlobObject(fileSize, fileContent))
        .map((blobObject) => hashObject(blobObject, directoryPath));

    const hash = crypto.createHash("sha256");
    const curStagingHash = hash.update(curStaging.join(" ")).digest("hex");

    const preStagingHash = fs.readFileSync(`${directoryPath}/.mit/index`, "utf8");

    if (curStagingHash !== preStagingHash) {
        fs.writeFileSync(`${directoryPath}/.mit/index`, curStagingHash);

        writeHashDictionary(directoryPath, curStagingHash, curStaging);
    }
}
