import fs from "fs";
import { Path } from "./main";
import { Hash, hashObject, readHashDictionary } from "./hash";
import { glob } from "glob";
import CommitObject from "./Object.commit";
import BlobObject from "./Object.Blob";
import TreeObject, { SnapshotRecord } from "./Object.Tree";

export default async function status(): Promise<void> {
    const directoryPath = process.argv[3];

    // read staging
    const index = fs.readFileSync(`${directoryPath}/.mit/index`, "utf8");

    const staging: SnapshotRecord = TreeObject.parse(readHashDictionary(directoryPath, index));
    const hashesOfStaging = staging.map((blobRecord) => blobRecord.hash);

    // read commit snapshot
    const head: Hash = fs.readFileSync(`${directoryPath}/.mit/HEAD`, "utf8");
    const { curTreeHash: topTreeHash } = CommitObject.parse(
        readHashDictionary(directoryPath, head),
    );
    const snapshot: SnapshotRecord = TreeObject.parse(
        readHashDictionary(directoryPath, topTreeHash),
    );
    const hashesOfSnapshot = snapshot.map((blobRecord) => blobRecord.hash);

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
        .filter(([hash]) => !hashesOfSnapshot.includes(hash) && !hashesOfStaging.includes(hash))
        .forEach(([, filePath]) => console.log(filePath));
    console.log();

    console.log("Changes not staged for commit:");
    hashes
        .filter(([hash]) => !hashesOfSnapshot.includes(hash) && hashesOfStaging.includes(hash))
        .map(([, filePath]) => console.log(filePath));
}
