import fs from "fs";
import { Hash } from "./hashManager";
import checkout from "./commands.checkout";

export default function restore() {
    const directoryPath = process.argv[3];
    const restoreHash = process.argv[4];

    const commits: Hash[] = fs.readFileSync(`${directoryPath}/.mit/commits`, "utf8").split(/\s/);
    const index = commits.findIndex((hash) => hash === restoreHash);
    const restored = commits.slice(index).join("\n");

    fs.writeFileSync(`${directoryPath}/.mit/commits`, restored);

    checkout();
}
