import { readHEAD, writeHEAD, writeIndex } from "./fileSystem";
import { readHashDictionary } from "./commands.hash-object";
import CommitObject from "./Object.Commit";
import { Hash } from "./hashManager";
import TreeObject from "./Object.Tree";
import chalk from "chalk";

export default function checkout() {
    const head: Hash = readHEAD();
    const restoreHash: Hash = process.argv[4] || head;

    const { snapshotHash } = readHashDictionary(restoreHash, CommitObject.parse);

    writeHEAD(restoreHash);
    writeIndex(snapshotHash);

    // display
    console.log("Snapshot");
    console.log();
    console.log(chalk.blue(snapshotHash));
    console.log(...readHashDictionary(snapshotHash, TreeObject.parse));
}
