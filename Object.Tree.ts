import { Hash, hashObject } from "./hashManager";
import MitObject from "./Object";
import { BlobRecord } from "./Object.Blob";
import { StagingRecord } from "./StagingArea";

export interface SnapshotRecord {
    mode: string;
    name: string;
    hash: Hash;
}

class TreeObject extends MitObject {
    #directoryName: string;
    #content: (TreeObject | BlobRecord)[];

    constructor(directoryName: string, content: (TreeObject | BlobRecord)[]) {
        super();

        this.#directoryName = directoryName;
        this.#content = content;
    }

    get content(): Buffer {
        const str = this.#content
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
            ([directoryName, records]) => makeTree(directoryName, records),
        );
        const tree = new TreeObject(directoryName, [...files, ...directories]);

        hashObject(tree, false);
        return tree;
    }
}

export const makeTree = TreeObject.makeTree;
