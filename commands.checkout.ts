import { writeHEAD, writeIndex } from "./fileSystem";
import { readHashDictionary } from "./hashObject";
import CommitObject from "./Object.Commit";

export default function checkout() {
    const restoreHash = process.argv[4];

    const { snapshotHash } = CommitObject.parse(readHashDictionary(restoreHash));

    writeHEAD(restoreHash);
    writeIndex(snapshotHash);
}
