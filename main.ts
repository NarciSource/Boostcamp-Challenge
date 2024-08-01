import fs from "fs";
import init from "./commands.init";
import add from "./commands.add";
import status from "./commands.status";
import commit from "./commands.commit";
import log from "./commands.log";
import checkout from "./commands.checkout";
import restore from "./commands.restore";
import { Hash } from "./hashManager";


/**
 * init 디렉토리명
 * add 디렉토리명
 * status 디렉토리명
 * commit 디렉토리명
 * log 디렉토리명
 * restore 디렉토리명 {8자리 | 64자리 커밋해시값}
 */
[process.argv[3], process.argv[4]] = !process.argv[4]
    ? [".", process.argv[3]]
    : [process.argv[3], process.argv[4]];

if (process.argv[4]?.length === 8) {
    const commits: Hash[] = fs.readFileSync(`${process.argv[3]}/.mit/commits`, "utf8").split(/\s/);
    const found = commits.filter((hash) => hash.includes(process.argv[4]));

    if (found.length === 1) {
        process.argv[4] = found[0];
    }
}

const commands = { init, add, status, commit, log, checkout, restore };
commands[process.argv[2]]();
