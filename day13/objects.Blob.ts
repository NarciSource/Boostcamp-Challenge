import zlib from "zlib";
import MitObject from "./objects.Base";
import Hash, { createHash } from "./collections.Hash";

export interface BlobRecord {
    hash: Hash;
    name: string;
    size: number;
}

export default class BlobObject extends MitObject {
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
    decompress(): void {
        this.content = zlib.inflateSync(this.content);
        this.size = this.content.length;
    }

    static parse(str: string): BlobRecord[] {
        return str
            ?.split("\n")
            .map((line) =>
                (([hash, size, name]) => ({ hash: createHash(hash), size: parseInt(size), name }))(
                    line.split(/\s/),
                ),
            );
    }
}
