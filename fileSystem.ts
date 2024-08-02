import fs from "fs";
import { glob } from "glob";
import { Hash } from "./hashManager";
import BlobObject from "./Object.Blob";

export type Path = string;

export async function readDirectory(): Promise<string[]> {
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

export function readObjects(hash: Path): any {
    const directoryPath = process.argv[3];

    return fs.readFileSync(
        `${directoryPath}/.mit/objects/${hash.substring(0, 8)}/${hash.substring(8)}`,
        "utf8",
    );
}
export function writeObjects(directory: Path, filePath: Path, buffer: Buffer): void {
    const directoryPath = process.argv[3];

    fs.mkdirSync(`${directoryPath}/.mit/objects/${directory}`, {
        recursive: true,
    });
    fs.writeFileSync(`${directoryPath}/.mit/objects/${directory}/${filePath}`, buffer);
}

export function writeDirectory(directory: Path): void {
    const directoryPath = process.argv[3];

    fs.mkdirSync(`${directoryPath}/.mit/${directory}/`, {
        recursive: true,
    });
}
export function readFile(filePath: Path): BlobObject {
    const fileContent = fs.readFileSync(filePath);

    return new BlobObject(filePath, fileContent);
}
