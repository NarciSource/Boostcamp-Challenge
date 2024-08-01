import fs from "fs";
import { Path } from "./main";
import { Hash, hashObject, readHashDictionary } from "./hash";
import { glob } from "glob";
import BlobObject from "./Object.Blob";
import CommitObject from "./Object.commit";

export default async function status(directoryPath: Path): Promise<void> {
    // read staging
    const index = fs.readFileSync(`${directoryPath}/.mit/index`, "utf8");
    const staging = readHashDictionary(directoryPath, index).split(/\s/);

    // read commit snapshot
    const head: Hash = fs.readFileSync(`${directoryPath}/.mit/HEAD`, "utf8");
    const { curTreeHash: topTreeHash } = CommitObject.parse(
        readHashDictionary(directoryPath, head),
    );
    const snapshot = readHashDictionary(directoryPath, topTreeHash)?.split(/\s/);

    // read current files
    const filePaths: Path[] = await glob(`${directoryPath}/**/*`, {
        ignore: ["node_modules/**", ".mit/**"],
    });
    const hashes = filePaths.map((filePath: string) => {
        const fileContent = fs.readFileSync(filePath);
        const blobObject = new BlobObject(filePath, fileContent);
        const hash = hashObject(blobObject, directoryPath, true);
        return [hash, filePath];
    });

    // diff
    console.log("Changes to be committed:");
    hashes
        .filter(([hash]) => !snapshot.includes(hash) && !staging.includes(hash))
        .forEach(([, filePath]) => console.log(filePath));
    console.log();

    console.log("Changes not staged for commit:");
    hashes
        .filter(([hash]) => !snapshot.includes(hash) && staging.includes(hash))
        .map(([, filePath]) => console.log(filePath));
}
