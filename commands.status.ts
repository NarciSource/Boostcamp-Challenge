import { Path, readDirectory, readFile, readHEAD, readIndex } from "./fileSystem";
import Hash from "./collections.Hash";
import { hashObject, readHashDictionary } from "./commands.hash-object";
import BlobObject, { BlobRecord } from "./objects.Blob";
import TreeObject, { TreeRecord } from "./objects.Tree";
import CommitObject from "./objects.Commit";
import chalk from "chalk";
import DefaultDict, { DefaultDictProperties } from "./collections.DefaultDict";

export default async function status(): Promise<void> {
    // collect to hash
    type HashCollection = { staged: Hash; committed: Hash; current: Hash };
    const hashDictionary = new DefaultDict<HashCollection>(() => ({
        staged: null,
        committed: null,
        current: null,
    }));

    // read staging
    const index: Hash = readIndex();
    const stagingArea: BlobRecord[] = readHashDictionary(index, BlobObject.parse);

    for (const { name, hash } of stagingArea) {
        hashDictionary[name].staged = hash;
    }

    // read commit snapshot
    const head: Hash = readHEAD();
    const { snapshotHash } = readHashDictionary(head, CommitObject.parse);
    const tree: TreeRecord[] = readHashDictionary(snapshotHash, TreeObject.parse);

    for (const { name, hash } of tree) {
        hashDictionary[name].committed = hash;
    }

    // read current files
    const filePaths: Path[] = await readDirectory();
    const blobObjects = filePaths
        .map(readFile)
        .map((blobObject) => hashObject(blobObject, true) && blobObject);

    for (const { name, hash } of blobObjects) {
        hashDictionary[name].current = hash;
    }

    // collect to status
    type StatusCollection = { "new file": string[]; modified: string[]; deleted: string[] };
    const statusDictionary = Object.entries<HashCollection>(
        hashDictionary as DefaultDictProperties<HashCollection>,
    )
        .map(([name, { staged, committed, current }]) => {
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
        .reduce(
            (acc, [name, status, operation]) => {
                acc[status][operation].push(name);

                return acc;
            },
            new DefaultDict<StatusCollection>(() => ({
                "new file": [],
                modified: [],
                deleted: [],
            })),
        );

    // display
    for (const [status, operations] of Object.entries<StatusCollection>(
        statusDictionary as DefaultDictProperties<StatusCollection>,
    )) {
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
