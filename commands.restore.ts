import { readCommits, writeCommits } from "./fileSystem";
import { Hash } from "./hashManager";
import checkout from "./commands.checkout";

export default function restore() {
    const restoreHash = process.argv[4];

    const commits: Hash[] = readCommits();
    const index = commits.findIndex((hash) => hash === restoreHash);
    const restored = commits.slice(index);

    writeCommits(restored);

    checkout();
}
