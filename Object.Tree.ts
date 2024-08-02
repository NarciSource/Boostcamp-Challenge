import { Hash } from "./hashManager";
import MitObject from "./Object";
import { BlobRecord } from "./Object.Blob";
import { StagingRecord } from "./StagingArea";

export interface SnapshotRecord {
    mode: string;
    name: string;
    hash: Hash;
}

export default class TreeObject extends MitObject {
    #directoryName: string;
    #contents: (TreeObject | BlobRecord)[];

    constructor(directoryName: string, content: (TreeObject | BlobRecord)[]) {
        super();

        this.#directoryName = directoryName;
        this.#contents = content;
    }

    get content(): Buffer {
        const str = this.#contents
            .map((each) => {
                if (each instanceof TreeObject) {
                    return `tree ${each.hash} ${each.#directoryName}`;
                } else {
                    return `blob ${each.hash} ${each.name}`;
                }
            })
            .join("\n");
        return Buffer.from(str);
    }

    get childrenTree(): TreeObject[] {
        return this.#contents.filter((record) => record instanceof TreeObject);
    }

    static makeTree(directoryName: string, records: StagingRecord): TreeObject {
        const regex = /([^\\]+)(?:\\(.+))?/;
        const files: StagingRecord = records.filter(({ name }) => !regex.exec(name)[2]);
        const directoryDictionary: { [key: string]: StagingRecord } = records
            .filter(({ name }) => {
                const [, directoryName, filename] = regex.exec(name);
                return directoryName && filename;
            })
            .reduce((acc, { hash, name, size }) => {
                const [, directoryName, filename] = regex.exec(name);
                const record: BlobRecord = { hash, name: filename, size };

                acc[directoryName] = [...(acc[directoryName] || []), record];

                return acc;
            }, {});

        const directories: TreeObject[] = Object.entries(directoryDictionary).map(
            ([directoryName, records]) => TreeObject.makeTree(directoryName, records),
        );
        return new TreeObject(directoryName, [...files, ...directories]);
    }

    static parse(str: string): SnapshotRecord[] {
        return str
            ?.split("\n")
            .map((line) => (([mode, hash, name]) => ({ mode, name, hash }))(line.split(" ")));
    }
}

export const makeTree = TreeObject.makeTree;
