import { readCommits } from "./fileSystem";
import { readHashDictionary } from "./commands.hash-object";
import { compareAdjacent } from "./utils";
import CommitObject, { CommitRecord } from "./Object.Commit";
import { StagingRecord } from "./Object.StagingArea";
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

    // display
    for (let i = 0; i < diff.length; i++) {
        console.log(commits[i], commitHistory[i].time);
        console.log(diff[i]);
    }
}
