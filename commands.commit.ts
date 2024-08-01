import fs from "fs";
import { Path } from "./main";
import { Hash, hashObject, readHashDictionary } from "./hash";
import CommitObject from "./Object.commit";

export default function commit(directoryPath: Path) {
    const index = fs.readFileSync(`${directoryPath}/.mit/index`, "utf8");
    const head = fs.readFileSync(`${directoryPath}/.mit/HEAD`, "utf8");

    const commitHistory = readHashDictionary(directoryPath, head)?.split("\n")?.[0];
    const topHash: Hash = commitHistory?.split(" ")?.[1];

    if (index !== topHash) {
        const commit = new CommitObject("HEAD", [head, index]);
        hashObject(commit, directoryPath, false);

        const commits: Buffer = fs.readFileSync(`${directoryPath}/.mit/commits`);

        fs.writeFileSync(`${directoryPath}/.mit/commits`, `${commit.hash}\n${commits}`);
        fs.writeFileSync(`${directoryPath}/.mit/HEAD`, commit.hash);
    }
}
