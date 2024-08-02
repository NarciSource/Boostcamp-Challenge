import { Path, readDirectory, readFile, readHEAD, readIndex } from "./fileSystem";
import { Hash } from "./hashManager";
import { hashObject, readHashDictionary } from "./hashObject";
import BlobObject, { BlobRecord } from "./Object.Blob";
import CommitObject from "./Object.Commit";
import TreeObject, { TreeRecord } from "./Object.Tree";

export default async function status(): Promise<void> {
    // read staging
    const index: Hash = readIndex();

    const staging: BlobRecord[] = readHashDictionary(index, BlobObject.parse);
    const hashesOfStaging = staging.map((blobRecord) => blobRecord.hash);

    // read commit snapshot
    const head: Hash = readHEAD();
    const { snapshotHash } = readHashDictionary(head, CommitObject.parse);
    const snapshot: TreeRecord[] = readHashDictionary(snapshotHash, TreeObject.parse);
    const hashesOfSnapshot = snapshot.map((blobRecord) => blobRecord.hash);

    // read current files
    const filePaths: Path[] = await readDirectory();
    const hashes: [Hash, string][] = filePaths
        .map(readFile)
        .map((blobObject) => [hashObject(blobObject, true), blobObject.name]);

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
