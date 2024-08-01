import fs from "fs";
import { Path } from "./main";
import { hashObject, readHashDictionary } from "./hash";
import { glob } from "glob";
import { readFile } from "./fileSystem";
import BlobObject from "./Blob";

export default async function status(directoryPath: Path): Promise<void> {
    const key = fs.readFileSync(`${directoryPath}/.mit/index`, "utf8");

    const staging = readHashDictionary(directoryPath, key).split(",");

    const filePaths: Path[] = await glob(`${directoryPath}/**/*`, {
        ignore: ["node_modules/**", ".mit/**"],
    });

    filePaths
        .filter((filePath) => {
            const [fileContent, fileSize] = readFile(filePath);
            const blobObject = new BlobObject(fileSize, fileContent);
            const hashCode = hashObject(blobObject, directoryPath);
            return !staging.includes(hashCode);
        })
        .forEach((filePath) => {
            console.log(filePath);
        });
}
