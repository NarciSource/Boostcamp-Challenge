import { Path, readDirectory, readFile, readHEAD, readIndex } from "./fileSystem";
import Hash from "./collections.Hash";
import { hashObject, readHashDictionary } from "./commands.hash-object";
import BlobObject, { BlobRecord } from "./objects.Blob";
import TreeObject, { TreeRecord } from "./objects.Tree";
import CommitObject from "./objects.Commit";
import chalk, { ChalkInstance } from "chalk";
import DefaultDict, { DefaultDictProperties } from "./collections.DefaultDict";
import { Operation, Status } from "./commands.status.enum";

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
    type StatusCollection = {
        [Operation.new]: string[];
        [Operation.modified]: string[];
        [Operation.deleted]: string[];
    };
    const statusDictionary = Object.entries<HashCollection>(
        hashDictionary as DefaultDictProperties<HashCollection>,
    )
        .map(([name, { staged, committed, current }]): [string, Status, Operation] => {
            let status: Status = null;
            let operation: Operation = null;

            if (!!current && !staged && !committed) {
                status = Status.untracked;
                operation = Operation.new;
            } else if (!!current && !!staged && !!committed) {
                if (current !== staged && staged === committed) {
                    status = Status.notStaged;
                } else if (staged !== committed) {
                    status = Status.toBeCommitted;
                }
                operation = Operation.modified;
            } else if (!!current && !!staged && !committed) {
                status = Status.toBeCommitted;
                operation = Operation.new;
            } else if (!current && !staged && !!committed) {
                status = Status.toBeCommitted;
                operation = Operation.deleted;
            } else if (!current && !!staged && !!committed) {
                status = Status.notStaged;
                operation = Operation.deleted;
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
                [Operation.new]: [],
                [Operation.modified]: [],
                [Operation.deleted]: [],
            })),
        );

    // display
    for (const [status, operations] of Object.entries<StatusCollection>(
        statusDictionary as DefaultDictProperties<StatusCollection>,
    )) {
        console.log(status);
        for (const [operation, names] of Object.entries(operations)) {
            for (const name of names) {
                let color: ChalkInstance;

                switch (status) {
                    case Status.toBeCommitted:
                        color = chalk.green;
                        break;
                    case Status.notStaged:
                        color = chalk.red;
                        break;
                    case Status.untracked:
                        color = chalk.gray;
                        break;
                }

                console.log("\t", color(operation, ":", name));
            }
        }
        console.log();
    }
}
