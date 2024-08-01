import { Path, readDirectory, readFile, readHEAD, readIndex } from "./fileSystem";
import { Hash, hashObject, readHashDictionary } from "./hashManager";
import CommitObject from "./Object.commit";
import TreeObject, { SnapshotRecord } from "./Object.Tree";

export default async function status(): Promise<void> {
    // read staging
    const index: Hash = readIndex();

    const staging: SnapshotRecord = TreeObject.parse(readHashDictionary(index));
    const hashesOfStaging = staging.map((blobRecord) => blobRecord.hash);

    // read commit snapshot
    const head: Hash = readHEAD();
    const { curTreeHash: topTreeHash } = CommitObject.parse(readHashDictionary(head));
    const snapshot: SnapshotRecord = TreeObject.parse(readHashDictionary(topTreeHash));
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
