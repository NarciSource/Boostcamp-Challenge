import fs from "fs";
import { glob } from "glob";
import { Path } from "./main";
import { hashObject, Hash } from "./hash";
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
        .map((filePath: Path) => fs.readFileSync(filePath))
        .map((fileContent: Buffer) => new BlobObject(fileContent))
        .map((blobObject: BlobObject): Hash => hashObject(blobObject, directoryPath, true));

    const preStagingHash = fs.readFileSync(`${directoryPath}/.mit/index`, "utf8");

    const buffer = Buffer.from(curStaging.join(" "));
    const blobObject = new BlobObject(buffer);
    const curStagingHash = hashObject(blobObject, directoryPath, false);

    if (curStagingHash !== preStagingHash) {
        fs.writeFileSync(`${directoryPath}/.mit/index`, curStagingHash);
    }
}
