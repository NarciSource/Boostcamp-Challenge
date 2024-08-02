import crypto from "crypto";

export type Hash = string;

export function hashing(data: Buffer): Hash {
    const hash = crypto.createHash("sha256");
    hash.update(data);
    const hashCode = hash.digest("hex");
    return hashCode;
}
