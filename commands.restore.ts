import { readCommits, writeCommits } from "./fileSystem";
import checkout from "./commands.checkout";
import { Hash } from "./hashManager";
import log from "./commands.log";

export default function restore() {
    const restoreHash = process.argv[4];

    const commits: Hash[] = readCommits();
    let index = commits.findIndex((hash) => hash === restoreHash);
    index = index === -1 ? 0 : index;
    const restored = commits.slice(index);

    writeCommits(restored);

    checkout();

    // display
    console.log();
    console.log("Log");
    console.log();
    log();
}
