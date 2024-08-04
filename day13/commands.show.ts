import { readHashDictionary } from "./commands.hash-object";
import { createHash } from "./collections.Hash";
import { writeLess } from "./fileSystem";

export default function show() {
    const hash = createHash(process.argv[4]);

    const text = readHashDictionary(hash, (i: string) => i);

    writeLess(text);
}
