import { Hash } from "./hash";
import MitObject from "./Object";

export default class CommitObject extends MitObject {
    #content: [Hash, Hash];

    constructor(name: string, content: [Hash, Hash]) {
        super();

        this.name = name;
        this.#content = content;
        this.size = this.content.length;
    }

    get content(): Buffer {
        const [preTreeHash, curTreeHash] = this.#content;

        return Buffer.from(`${preTreeHash} ${curTreeHash}\n${new Date().toLocaleString()}`);
    }
}
