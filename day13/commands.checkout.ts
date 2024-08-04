import { readHEAD, writeHEAD, writeIndex } from "./fileSystem";
import { readHashDictionary } from "./commands.hash-object";
import CommitObject from "./objects.Commit";
import Hash, { createHash } from "./collections.Hash";
import TreeObject from "./objects.Tree";
import chalk from "chalk";

export default function checkout() {
    const head: Hash = readHEAD();
    const restoreHash: Hash = createHash(process.argv[4]) || head;

    const { snapshotHash } = readHashDictionary(restoreHash, CommitObject.parse);

    writeHEAD(restoreHash);
    writeIndex(snapshotHash);

    // display
    console.log("Snapshot");
    console.log();
    console.log(chalk.blue(snapshotHash));
    console.log(...readHashDictionary(snapshotHash, TreeObject.parse));
}
