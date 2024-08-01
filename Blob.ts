import zlib from "zlib";
import { Hash, hashing } from "./hash";

export default class BlobObject {
    name: string;
    size: number;
    content: Buffer;
    #hash: Hash;

    constructor(name: string, content: Buffer) {
        this.name = name;
        this.content = content;
        this.size = content.length;
    }

    compress(): void {
        this.content = zlib.deflateSync(this.content);
        this.size = this.content.length;
    }

    get hash(): Hash {
        return (this.#hash = this.#hash || hashing(this.content));
    }
}
