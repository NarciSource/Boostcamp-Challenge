import { Hash, hashing } from "./hash";

export default abstract class MitObject {
    name: string;
    size: number;
    protected _hash: Hash;

    abstract get content(): Buffer;

    compress(): void {}

    get hash(): Hash {
        return (this._hash = this._hash || hashing(this.content));
    }
}
