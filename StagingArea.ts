import MitObject from "./Object";
import BlobObject, { BlobRecord } from "./Object.Blob";

export type SnapshotRecord = BlobRecord[];

class StagingArea extends MitObject {
    #content: SnapshotRecord;

    constructor() {
        super();
    }

    update(snapshotRecord: SnapshotRecord): StagingArea {
        this.name = "StagingArea";
        this.#content = snapshotRecord;
        this.size = this.content.length;
        return this;
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

export default new StagingArea();
