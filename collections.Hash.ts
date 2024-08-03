import crypto from "crypto";
import { readAllHash } from "./fileSystem";

type Hash = string & { __brand: "Hash" };
export default Hash;

export function createHash(str: string): Hash {
    if (isHash(str)) {
        return str as Hash;
    } else if (isShortHash(str)) {
        return resolveHash(str);
    } else if (!str) {
        return "" as Hash;
    } else {
        throw "It is not hash.";
    }
}

export function hashing(data: Buffer): Hash {
    const hash = crypto.createHash("sha256");
    hash.update(data);
    const hashCode = hash.digest("hex");

    return hashCode as Hash;
}

export function isHash(str: string): boolean {
    return str?.length === 64;
}
export function isShortHash(str: string): boolean {
    return str?.length === 8;
}

export function resolveHash(shortHash: string): Hash {
    try {
        const [prefix, suffix] = readAllHash().find(([prefix]) => prefix === shortHash);
        return (prefix + suffix) as Hash;
    } catch (e) {
        throw "Hash not found";
    }
}
