import fs from "fs";
import { Path } from "./main";
import { Hash, hashObject, readHashDictionary } from "./hash";
import CommitObject from "./Object.commit";

export default function commit(directoryPath: Path) {
    const index = fs.readFileSync(`${directoryPath}/.mit/index`, "utf8");
    const head = fs.readFileSync(`${directoryPath}/.mit/HEAD`, "utf8");

    const lines = readHashDictionary(directoryPath, head).split("\n");
    const [, topHash]: [Hash, Hash] = lines?.[0].split(" ") || [, null];

    if (index !== topHash) {
        const commit = new CommitObject("HEAD", [head, index]);
        hashObject(commit, directoryPath, false);

        fs.writeFileSync(`${directoryPath}/.mit/HEAD`, commit.hash);
    }
}
