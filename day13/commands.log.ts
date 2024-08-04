import { readCommits } from "./fileSystem";
import { readHashDictionary } from "./commands.hash-object";
import { compareAdjacent } from "./utils";
import CommitObject, { CommitRecord } from "./objects.Commit";
import { StagingRecord } from "./objects.StagingArea";
import Hash from "./collections.Hash";
import TreeObject from "./objects.Tree";
import chalk from "chalk";

export default function log() {
    const hashes: Hash[] = readCommits();

    const commitHistory: CommitRecord[] = hashes.map((commitHash: Hash) =>
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
        console.log(chalk.blue(hashes[i]), commitHistory[i].time);
        console.log(diff[i]);
    }
}
