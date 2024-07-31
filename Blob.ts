export class BlobObject {
    size: number;
    content: string;

    constructor(size: number, content: string) {
        this.size = size;
        this.content = content;
    }
}
