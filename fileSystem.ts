import fs from "fs";
import { glob } from "glob";
import BlobObject from "./Object.Blob";
import { Hash } from "./hashManager";

export type Path = string;

export async function readDirectory(): Promise<Path[]> {
    const directoryPath = process.argv[3];

    return glob(`${directoryPath}/**/*`, {
        ignore: ["node_modules/**", ".mit/**"],
        nodir: true,
    });
}

export function readIndex(): Hash {
    const directoryPath = process.argv[3];

    return fs.readFileSync(`${directoryPath}/.mit/index`, "utf8");
}
export function writeIndex(hash: Hash): void {
    const directoryPath = process.argv[3];

    fs.writeFileSync(`${directoryPath}/.mit/index`, hash);
}

export function readHEAD(): Hash {
    const directoryPath = process.argv[3];

    return fs.readFileSync(`${directoryPath}/.mit/HEAD`, "utf8");
}
export function writeHEAD(hash: Hash): void {
    const directoryPath = process.argv[3];

    fs.writeFileSync(`${directoryPath}/.mit/HEAD`, hash);
}

export function readCommits(): Hash[] {
    const directoryPath = process.argv[3];

    return fs.readFileSync(`${directoryPath}/.mit/commits`, "utf8").split("\n");
}
export function writeCommits(hashes: Hash[]): void {
    const directoryPath = process.argv[3];

    fs.writeFileSync(`${directoryPath}/.mit/commits`, hashes.join("\n"));
}

export function readObjects(hash: Hash): any {
    const directoryPath = process.argv[3];
    const [directory, file] = [hash.substring(0, 8), hash.substring(8)];

    return fs.readFileSync(
        `${directoryPath}/.mit/objects/${directory}/${file}`,
        "utf8",
    );
}
export function writeObjects(hash: Hash, buffer: Buffer): void {
    const directoryPath = process.argv[3];
    const [directory, file] = [hash.substring(0, 8), hash.substring(8)];

    fs.mkdirSync(`${directoryPath}/.mit/objects/${directory}`, {
        recursive: true,
    });
    fs.writeFileSync(`${directoryPath}/.mit/objects/${directory}/${file}`, buffer);
}

export function writeDirectory(directory: Path): void {
    const directoryPath = process.argv[3];

    fs.mkdirSync(`${directoryPath}/.mit/${directory}/`, {
        recursive: true,
    });
}
export function readFile(file: Path): BlobObject {
    const fileContent = fs.readFileSync(file);

    return new BlobObject(file, fileContent);
}
