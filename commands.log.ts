import fs from "fs";
import { Path } from "./main";
import { Hash, readHashDictionary } from "./hash";
import { compareAdjacent } from "./utils";

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

    const snapshotHistory: { hash: Hash; size: number; fileName: string }[][] = commitHistory
        .map(({ hashPair: [preCommitHash, curCommitHash] }) =>
            readHashDictionary(directoryPath, curCommitHash)?.split("\n"),
        )
        .map((snapshotLines: string[]) =>
            snapshotLines?.map((line) => {
                const [hash, size, fileName] = line.split(/\s/);
                return { hash, size: parseInt(size), fileName };
            }),
        );

    // find changes in snapshot history
    const entriesFunc = ({ hash, size, fileName }) => [hash, fileName];
    const diff = compareAdjacent(snapshotHistory, entriesFunc);

    for (let i = 0; i < diff.length; i++) {
        console.log(commits[i], commitHistory[i].time);
        console.log(diff[i]);
    }
}
