import zlib from "zlib";
import { Hash, hashing } from "./hash";

export default class BlobObject {
    size: number;
    content: Buffer;
    #hash: Hash;

    constructor(size: number, content: Buffer) {
        this.size = size;
        this.content = content;
    }

    compress() {
        this.content = zlib.deflateSync(this.content);
        this.size = this.content.length;
    }

    get hash() {
        return (this.#hash = this.#hash || hashing(this.content));
    }
}
