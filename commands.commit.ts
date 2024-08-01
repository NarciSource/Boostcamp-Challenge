import { readCommits, readHEAD, readIndex, writeCommits, writeHEAD } from "./fileSystem";
import { Hash, hashObject, readHashDictionary } from "./hashManager";
import CommitObject, { CommitRecord } from "./Object.commit";

export default function commit() {
    const index = readIndex();
    const head = readHEAD();

    const { curTreeHash: topHash }: CommitRecord = CommitObject.parse(readHashDictionary(head));

    if (index !== topHash) {
        const commit = new CommitObject("HEAD", [head, index]);
        hashObject(commit, false);

        const commits: Hash[] = readCommits();

        writeCommits([commit.hash, ...commits]);
        writeHEAD(commit.hash);
    }
}
