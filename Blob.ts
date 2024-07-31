export default class BlobObject {
    size: number;
    content: Buffer;

    constructor(size: number, content: Buffer) {
        this.size = size;
        this.content = content;
    }
}
