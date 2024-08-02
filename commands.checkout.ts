import { writeHEAD, writeIndex } from "./fileSystem";
import { readHashDictionary } from "./hashObject";
import CommitObject from "./Object.Commit";

export default function checkout() {
    const restoreHash = process.argv[4];

    const { snapshotHash } = readHashDictionary(restoreHash, CommitObject.parse);

    writeHEAD(restoreHash);
    writeIndex(snapshotHash);
}
