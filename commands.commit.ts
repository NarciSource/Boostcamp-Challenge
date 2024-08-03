import { readCommits, readHEAD, readIndex, writeCommits, writeHEAD } from "./fileSystem";
import Hash from "./collections.Hash";
import { hashObject, readHashDictionary } from "./commands.hash-object";
import BlobObject from "./objects.Blob";
import CommitObject, { CommitRecord } from "./objects.Commit";
import { makeTree } from "./objects.Tree";
import { StagingRecord } from "./objects.StagingArea";
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
    const snapshot = makeTree("root", stagingRecord);
    // save tree recursive
    hashObject(snapshot, false);

    // compare
    if (snapshot.hash !== committedHash) {
        const commit = new CommitObject("HEAD", head, snapshot.hash);
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
