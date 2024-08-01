import fs from "fs";
import { Hash } from "./hash";
import checkout from "./commands.checkout";

const [directoryPath, restoreHash] = !process.argv[4]
    ? [".", process.argv[3]]
    : [process.argv[3], process.argv[4]];

export default function restore() {
    const commits: Hash[] = fs.readFileSync(`${directoryPath}/.mit/commits`, "utf8").split(/\s/);
    const index = commits.findIndex((hash) => hash === restoreHash);
    const restored = commits.slice(index).join("\n");

    fs.writeFileSync(`${directoryPath}/.mit/commits`, restored);

    checkout();
}
