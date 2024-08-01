import { Hash } from "./hashManager";
import MitObject from "./Object";

export interface CommitRecord {
    preTreeHash: Hash;
    curTreeHash: Hash;
    time: string;
}

export default class CommitObject extends MitObject {
    preTreeHash: Hash;
    curTreeHash: Hash;
    time: string;

    constructor(name: string, content: [Hash, Hash]) {
        super();

        this.name = name;
        [this.preTreeHash, this.curTreeHash] = content;
        this.time = new Date().toLocaleDateString();
        this.size = this.content.length;
    }

    get content(): Buffer {
        return Buffer.from(`${this.preTreeHash} ${this.curTreeHash}\n${this.time}`);
    }

    static parse(str: string): CommitRecord {
        const lines = str?.split("\n");
        const [preTreeHash, curTreeHash] = lines?.[0].split(" ") || [null, null];
        const time = lines?.[1];

        return {
            preTreeHash,
            curTreeHash,
            time,
        };
    }
}
