import fs from "fs";
import { Path } from "./main";
import { Hash, hashObject, readHashDictionary } from "./hash";
import { glob } from "glob";
import BlobObject from "./Object.Blob";

export default async function status(directoryPath: Path): Promise<void> {
    const index = fs.readFileSync(`${directoryPath}/.mit/index`, "utf8");

    const staging = readHashDictionary(directoryPath, index).split(" ");

    const filePaths: Path[] = await glob(`${directoryPath}/**/*`, {
        ignore: ["node_modules/**", ".mit/**"],
    });

    filePaths
        .filter((filePath) => {
            const fileContent: Buffer = fs.readFileSync(filePath);
            const blobObject = new BlobObject(filePath, fileContent);
            const hashCode: Hash = hashObject(blobObject, directoryPath, true);
            return !staging.includes(hashCode);
        })
        .forEach((filePath) => {
            console.log(filePath);
        });
}
