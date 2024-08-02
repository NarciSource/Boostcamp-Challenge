import { readCommits, writeCommits } from "./fileSystem";
import checkout from "./commands.checkout";
import { Hash } from "./hashManager";

export default function restore() {
    const restoreHash = process.argv[4];

    const commits: Hash[] = readCommits();
    const index = commits.findIndex((hash) => hash === restoreHash);
    const restored = commits.slice(index);

    writeCommits(restored);

    checkout();
}
