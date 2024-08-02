import {
    readCommits,
    readHEAD,
    readIndex,
    readObjects,
    writeCommits,
    writeHEAD,
} from "./fileSystem";
import { Hash, hashObject, readHashDictionary } from "./hashManager";
import CommitObject, { CommitRecord } from "./Object.Commit";
import { makeTree } from "./Object.Tree";
import StagingArea, { StagingRecord } from "./StagingArea";

export default function commit() {
    const head = readHEAD();
    const { snapshotHash: committedSnapshotHash }: CommitRecord = CommitObject.parse(
        readHashDictionary(head),
    );

    const index = readIndex();
    const stagingRecord: StagingRecord = StagingArea.parse(readObjects(index));
    const snapshotHash: Hash = makeTree(stagingRecord);

    if (snapshotHash !== committedSnapshotHash) {
        const commit = new CommitObject("HEAD", head, snapshotHash);
        hashObject(commit, false);

        const commits: Hash[] = readCommits();

        writeCommits([commit.hash, ...commits]);
        writeHEAD(commit.hash);
    }
}
