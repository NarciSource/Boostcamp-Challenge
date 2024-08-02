import { writeObjects } from "./fileSystem";
import { Hash, hashing } from "./hashManager";
import { BlobRecord } from "./Object.Blob";
import { StagingRecord } from "./StagingArea";

export interface SnapshotRecord {
    mode: string;
    name: string;
    hash: Hash;
}

export function makeTree(records: StagingRecord): Hash {
    const regex = /([^\\]+)(?:\\(.+))?/;
    const directories: { [key: string]: StagingRecord } = {};
    const files: StagingRecord = [];

    for (const { hash, name, size } of records) {
        let [, directory, filename] = regex.exec(name);
        if (!filename) {
            filename = directory;
            directory = null;

            const record: BlobRecord = { hash, name: filename, size };
            files.push(record);
        }
        if (directory) {
            const record: BlobRecord = { hash, name: filename, size };

            directories[directory] = [...(directories[directory] || []), record];
        }
    }

    const save = files.map(({ hash, name }) => `blob ${hash} ${name}`);

    for (const [directory, records] of Object.entries(directories)) {
        const hash = makeTree(records);

        save.push(`tree ${hash} ${directory}`);
    }

    const str = save.join("\n");

    const buffer = Buffer.from(str);
    const hash = hashing(buffer);

    writeObjects(hash.substring(0, 8), hash.substring(8), buffer);
    return hash;
}
