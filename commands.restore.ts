import { readCommits, readHEAD, writeCommits, writeHEAD, writeIndex } from "./fileSystem";
import Hash, { createHash } from "./Hash";
import log from "./commands.log";
import { readHashDictionary } from "./commands.hash-object";
import CommitObject from "./Object.Commit";

export default function restore() {
    const head: Hash = readHEAD();
    const restoreHash = createHash(process.argv[4]) || head;

    const { snapshotHash } = readHashDictionary(restoreHash, CommitObject.parse);

    const commits: Hash[] = readCommits();
    let index = commits.findIndex((hash) => hash === restoreHash);
    index = index === -1 ? 0 : index;
    const restored = commits.slice(index);

    writeCommits(restored);

    writeHEAD(restoreHash);
    writeIndex(snapshotHash);

    // display
    console.log("Log");
    console.log();
    log();
}
//s
