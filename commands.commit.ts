import {
    readCommits,
    readHEAD,
    readIndex,
    readObjects,
    writeCommits,
    writeHEAD,
} from "./fileSystem";
import { Hash } from "./hashManager";
import { hashObject, readHashDictionary } from "./hashObject";
import CommitObject, { CommitRecord } from "./Object.Commit";
import { makeTree } from "./Object.Tree";
import StagingArea, { StagingRecord } from "./StagingArea";

export default function commit() {
    const head = readHEAD();
    const { snapshotHash: committedSnapshotHash }: CommitRecord = readHashDictionary(
        head,
        CommitObject.parse,
    );

    const index = readIndex();
    const stagingRecord: StagingRecord = readHashDictionary(index, StagingArea.parse);
    const tree = makeTree("root", stagingRecord);
    const snapshotHash: Hash = tree.hash;
    hashObject(tree, false);

    if (snapshotHash !== committedSnapshotHash) {
        const commit = new CommitObject("HEAD", head, snapshotHash);
        hashObject(commit, false);

        const commits: Hash[] = readCommits();

        writeCommits([commit.hash, ...commits]);
        writeHEAD(commit.hash);
    }
}
