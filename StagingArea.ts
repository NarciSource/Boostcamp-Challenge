import MitObject from "./Object";
import BlobObject, { BlobRecord } from "./Object.Blob";

export type StagingRecord = BlobRecord[];

class StagingArea extends MitObject {
    #content: StagingRecord;

    constructor() {
        super();
    }

    update(StagingRecord: StagingRecord): StagingArea {
        this.name = "StagingArea";
        this.#content = StagingRecord;
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

    parse(str: string): StagingRecord {
        return str.split("\n").map(BlobObject.parse);
    }
}

export default new StagingArea();
