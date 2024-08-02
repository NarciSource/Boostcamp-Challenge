import { readCommits } from "./fileSystem";
import { readHashDictionary } from "./hashObject";
import { compareAdjacent } from "./utils";
import CommitObject, { CommitRecord } from "./Object.Commit";
import { StagingRecord } from "./StagingArea";
import { Hash } from "./hashManager";
import TreeObject from "./Object.Tree";

export default function log() {
    const commits: Hash[] = readCommits();

    const commitHistory: CommitRecord[] = commits.map((commitHash: Hash) =>
        readHashDictionary(commitHash, CommitObject.parse),
    );

    const snapshotHistory: StagingRecord[] = commitHistory
        .filter((i) => i)
        .map(({ snapshotHash }) => readHashDictionary(snapshotHash, TreeObject.parse));

    // find changes in snapshot history
    const entriesFunc = ({ hash, name }) => [hash, name];
    const diff = compareAdjacent([...snapshotHistory, []], entriesFunc);

    for (let i = 0; i < diff.length; i++) {
        console.log(commits[i], commitHistory[i].time);
        console.log(diff[i]);
    }
}
