import fs from "fs";
import { readHashDictionary } from "./hash";
import CommitObject from "./Object.commit";

export default function checkout() {
    const directoryPath = process.argv[3];
    const restoreHash = process.argv[4];

    const { curTreeHash } = CommitObject.parse(readHashDictionary(directoryPath, restoreHash));

    fs.writeFileSync(`${directoryPath}/.mit/HEAD`, restoreHash);
    fs.writeFileSync(`${directoryPath}/.mit/index`, curTreeHash);
}
