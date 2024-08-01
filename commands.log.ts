import fs from "fs";
import { Path } from "./main";
import { Hash, readHashDictionary } from "./hash";
import { compareAdjacent } from "./utils";
import { BlobRecord } from "./Object.Blob";

export default function log(directoryPath: Path) {
    const commits: Hash[] = fs.readFileSync(`${directoryPath}/.mit/commits`, "utf8").split(/\s/);

    const commitHistory: {
        hashPair: [Hash, Hash] | any[];
        time: string;
    }[] = commits
        .map((commitHash: Hash) => readHashDictionary(directoryPath, commitHash)?.split("\n") || [])
        .map(([hashLine, time]: [string, string]) => ({
            hashPair: hashLine?.split(/\s/) || [],
            time,
        }));

    const snapshotHistory: BlobRecord[][] = commitHistory
        .map(({ hashPair: [preCommitHash, curCommitHash] }) =>
            readHashDictionary(directoryPath, curCommitHash)?.split("\n"),
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
