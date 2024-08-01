import fs from "fs";
import { readHashDictionary } from "./hash";
import CommitObject from "./Object.commit";

const [directoryPath, restoreHash] = !process.argv[4]
    ? [".", process.argv[3]]
    : [process.argv[3], process.argv[4]];

export default function checkout() {
    const { curTreeHash } = CommitObject.parse(readHashDictionary(directoryPath, restoreHash));

    fs.writeFileSync(`${directoryPath}/.mit/HEAD`, restoreHash);
    fs.writeFileSync(`${directoryPath}/.mit/index`, curTreeHash);
}
