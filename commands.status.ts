import { Path, readDirectory, readFile, readHEAD, readIndex } from "./fileSystem";
import Hash from "./Hash";
import { hashObject, readHashDictionary } from "./commands.hash-object";
import BlobObject, { BlobRecord } from "./Object.Blob";
import CommitObject from "./Object.Commit";
import TreeObject, { TreeRecord } from "./Object.Tree";
import chalk from "chalk";

export default async function status(): Promise<void> {
    type HashCollection = { staged: Hash; committed: Hash; current: Hash };
    type StatusCollection = { "new file": []; modified: []; deleted: [] };

    const hashDictionary: { [name: string]: HashCollection } = {};

    // read staging
    const index: Hash = readIndex();
    const stagingArea: BlobRecord[] = readHashDictionary(index, BlobObject.parse);
    stagingArea
        .map(({ name, hash }) => [name, hash])
        .forEach(([name, hash]: [string, Hash]) => (hashDictionary[name].staged = hash));

    // read commit snapshot
    const head: Hash = readHEAD();
    const { snapshotHash } = readHashDictionary(head, CommitObject.parse);
    const tree: TreeRecord[] = readHashDictionary(snapshotHash, TreeObject.parse);
    tree.map(({ name, hash }) => [name, hash]).forEach(([name, hash]: [string, Hash]) => {
        hashDictionary[name] ||= {} as HashCollection;
        hashDictionary[name].committed = hash;
    });

    // read current files
    const filePaths: Path[] = await readDirectory();
    const blobObjects = filePaths.map(readFile);
    blobObjects
        .map((blobObject) => [blobObject.name, hashObject(blobObject, true)])
        .forEach(([name, hash]: [string, Hash]) => (hashDictionary[name].current = hash));

    const statusDictionary: { [status: string]: StatusCollection } = Object.entries(hashDictionary)
        .map(([name, { staged, committed, current }]): [string, string, string] => {
            let status: string = null;
            let operation: string = null;

            if (!!current && !staged && !committed) {
                status = "Untracked files";
                operation = "new file";
            } else if (!!current && !!staged && !!committed) {
                if (current !== staged && staged === committed) {
                    status = "Changes not staged for commit";
                    operation = "modified";
                } else if (staged !== committed) {
                    status = "Changes to be committed";
                    operation = "modified";
                }
            } else if (!!current && !!staged && !committed) {
                status = "Changes to be committed";
                operation = "new file";
            } else if (!current && !staged && !!committed) {
                status = "Changes to be committed";
                operation = "deleted";
            } else if (!current && !!staged && !!committed) {
                status = "Changes not staged for commit";
                operation = "deleted";
            }

            return [name, status, operation];
        })
        .filter(([, status, operation]) => !!status && !!operation)
        .reduce((acc, [name, status, operation]) => {
            acc[status] ||= {} as StatusCollection;
            acc[status][operation] ||= [];
            acc[status][operation].push(name);
            return acc;
        }, {} as { [status: string]: StatusCollection });

    // display
    for (const [status, operations] of Object.entries(statusDictionary)) {
        console.log(status);
        for (const [operation, names] of Object.entries(operations)) {
            for (const name of names) {
                if (status === "Changes to be committed") {
                    console.log("\t", chalk.green(operation, ":", name));
                }
                if (status === "Changes not staged for commit") {
                    console.log("\t", chalk.red(operation, ":", name));
                }
                if (status === "Untracked files") {
                    console.log("\t", chalk.gray(operation, ":", name));
                }
            }
        }
        console.log();
    }
}
