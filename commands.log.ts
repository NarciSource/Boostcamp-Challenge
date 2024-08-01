import fs from "fs";
import { Hash, readHashDictionary } from "./hash";
import { compareAdjacent } from "./utils";
import { SnapshotRecord } from "./Object.Tree";
import CommitObject, { CommitRecord } from "./Object.commit";

export default function log() {
    const directoryPath = process.argv[3];

    const commits: Hash[] = fs.readFileSync(`${directoryPath}/.mit/commits`, "utf8").split(/\s/);

    const commitHistory: CommitRecord[] = commits.map((commitHash: Hash) =>
        CommitObject.parse(readHashDictionary(directoryPath, commitHash)),
    );

    const snapshotHistory: SnapshotRecord[] = commitHistory
        .map(({ preTreeHash, curTreeHash }) =>
            readHashDictionary(directoryPath, curTreeHash)?.split("\n"),
        )
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
