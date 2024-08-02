import { Hash } from "./hashManager";
import MitObject from "./Object";

export interface CommitRecord {
    parentHash: Hash;
    snapshotHash: Hash;
    time: string;
}

export default class CommitObject extends MitObject {
    parentHash: Hash;
    snapshotHash: Hash;
    time: string;

    constructor(name: string, parentHash: Hash, snapshotHash: Hash) {
        super();

        this.name = name;
        this.parentHash = parentHash;
        this.snapshotHash = snapshotHash;
        this.time = new Date().toLocaleDateString();
        this.size = this.content.length;
    }

    get content(): Buffer {
        return Buffer.from(`${this.parentHash} ${this.snapshotHash}\n${this.time}`);
    }

    static parse(str: string): CommitRecord {
        const lines = str?.split("\n");
        const [parentHash, snapshotHash] = lines?.[0].split(" ") || [null, null];
        const time = lines?.[1];

        return {
            parentHash,
            snapshotHash,
            time,
        };
    }
}
