import BlobObject from "./Blob";
import { Hash, hashing } from "./hash";

export default class TreeObject {
    name: string;
    size: number;
    #content: BlobObject[];
    #hash: Hash;

    constructor(name: string, content: BlobObject[]) {
        this.name = name;
        this.#content = content;
        this.size = this.content.length;
    }

    get content(): Buffer {
        return Buffer.from(
            this.#content
                .map((blobObject) => `${blobObject.hash} ${blobObject.size} ${blobObject.name}`)
                .join(" "),
        );
    }

    compress(): void {}

    get hash(): Hash {
        return (this.#hash = this.#hash || hashing(this.content));
    }
}
