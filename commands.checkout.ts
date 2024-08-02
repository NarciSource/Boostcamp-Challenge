import { writeHEAD, writeIndex } from "./fileSystem";
import { readHashDictionary } from "./commands.hash-object";
import CommitObject from "./Object.Commit";
import { Hash } from "./hashManager";

export default function checkout() {
    const restoreHash: Hash = process.argv[4];

    const { snapshotHash } = readHashDictionary(restoreHash, CommitObject.parse);

    writeHEAD(restoreHash);
    writeIndex(snapshotHash);
}
