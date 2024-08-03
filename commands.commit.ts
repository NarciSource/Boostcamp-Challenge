import { readCommits, readHEAD, readIndex, writeCommits, writeHEAD } from "./fileSystem";
import { Hash } from "./hashManager";
import { hashObject, readHashDictionary } from "./commands.hash-object";
import BlobObject from "./Object.Blob";
import CommitObject, { CommitRecord } from "./Object.Commit";
import { makeTree } from "./Object.Tree";
import { StagingRecord } from "./Object.StagingArea";
import chalk from "chalk";

export default function commit() {
    // read staging of previous commit
    const head: Hash = readHEAD();
    const { snapshotHash: committedHash }: CommitRecord =
        readHashDictionary(head, CommitObject.parse) || {};

    // read staging
    const index = readIndex();
    const stagingRecord: StagingRecord = readHashDictionary(index, BlobObject.parse);
    // make snapshot
    const tree = makeTree("root", stagingRecord);
    const snapshotHash: Hash = tree.hash;
    // save tree recursive
    hashObject(tree, false);

    // compare
    if (snapshotHash !== committedHash) {
        const commit = new CommitObject("HEAD", head, snapshotHash);
        hashObject(commit, false);

        const commits: Hash[] = readCommits();
        writeCommits([commit.hash, ...commits]);

        writeHEAD(commit.hash);

        // display
        console.log(commit);
    } else {
        console.log(chalk.red("Nothing changed."));
    }
}
