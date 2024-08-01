import zlib from "zlib";
import MitObject from "./Object";
import { Hash } from "./hash";

export interface BlobRecord {
    hash: Hash;
    name: string;
    size: number;
}

export default class BlobObject extends MitObject {
    name: string;
    size: number;
    content: Buffer;

    constructor(name: string, content: Buffer) {
        super();

        this.name = name;
        this.content = content;
        this.size = content.length;
    }

    compress(): void {
        this.content = zlib.deflateSync(this.content);
        this.size = this.content.length;
    }
}
