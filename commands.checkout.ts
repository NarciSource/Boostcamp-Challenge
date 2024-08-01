import { writeHEAD, writeIndex } from "./fileSystem";
import { readHashDictionary } from "./hashManager";
import CommitObject from "./Object.Commit";

export default function checkout() {
    const restoreHash = process.argv[4];

    const { curTreeHash } = CommitObject.parse(readHashDictionary(restoreHash));

    writeHEAD(restoreHash);
    writeIndex(curTreeHash);
}
