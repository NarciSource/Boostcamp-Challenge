import { readCommits } from "./fileSystem";
import { Hash, readHashDictionary } from "./hashManager";
import { compareAdjacent } from "./utils";
import CommitObject, { CommitRecord } from "./Object.Commit";
import { StagingRecord } from "./StagingArea";

export default function log() {
    const commits: Hash[] = readCommits();

    const commitHistory: CommitRecord[] = commits.map((commitHash: Hash) =>
        CommitObject.parse(readHashDictionary(commitHash)),
    );

    const snapshotHistory: StagingRecord[] = commitHistory
        .map(({ snapshotHash }) => readHashDictionary(snapshotHash)?.split("\n"))
        .map((snapshotLines: string[]) =>
            snapshotLines?.map((line) => {
                const [hash, size, name] = line.split(/\s/);
                return { hash, size: parseInt(size), name };
            }),
        );

    // find changes in snapshot history
    const entriesFunc = ({ hash, size, name }) => [hash, name];
    const diff = compareAdjacent(snapshotHistory, entriesFunc);

    for (let i = 0; i < diff.length; i++) {
        console.log(commits[i], commitHistory[i].time);
        console.log(diff[i]);
    }
}
