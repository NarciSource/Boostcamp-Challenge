import { readCommits, readHEAD, readIndex, writeCommits, writeHEAD } from "./fileSystem";
import { Hash } from "./hashManager";
import { hashObject, readHashDictionary } from "./hashObject";
import BlobObject from "./Object.Blob";
import CommitObject, { CommitRecord } from "./Object.Commit";
import { makeTree } from "./Object.Tree";
import { StagingRecord } from "./StagingArea";

export default function commit() {
    const head = readHEAD();
    const { snapshotHash: committedSnapshotHash }: CommitRecord = readHashDictionary(
        head,
        CommitObject.parse,
    );

    const index = readIndex();
    const stagingRecord: StagingRecord = readHashDictionary(index, BlobObject.parse);
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
