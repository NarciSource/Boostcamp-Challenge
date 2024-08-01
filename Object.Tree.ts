import MitObject from "./Object";
import BlobObject, { BlobRecord } from "./Object.Blob";

export type SnapshotRecord = BlobRecord[];

export default class TreeObject extends MitObject {
    name: string;
    size: number;
    #content: SnapshotRecord;

    constructor(name: string, content: BlobObject[]) {
        super();

        this.name = name;
        this.#content = content;
        this.size = this.content.length;
    }

    get content(): Buffer {
        return Buffer.from(
            this.#content
                .map((blobObject) => `${blobObject.hash} ${blobObject.size} ${blobObject.name}`)
                .join("\n"),
        );
    }

    static parse(str: string): SnapshotRecord {
        return str.split("\n").map(BlobObject.parse);
    }
}
