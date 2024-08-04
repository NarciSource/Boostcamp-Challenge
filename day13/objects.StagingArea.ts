import MitObject from "./objects.Base";
import { BlobRecord } from "./objects.Blob";

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
}

export default new StagingArea();
