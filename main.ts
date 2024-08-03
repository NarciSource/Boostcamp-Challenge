#!/usr/bin/env node

import init from "./commands.init";
import add from "./commands.add";
import status from "./commands.status";
import commit from "./commands.commit";
import log from "./commands.log";
import checkout from "./commands.checkout";
import restore from "./commands.restore";
import { isHash, isShortHash } from "./collections.Hash";
import { Command } from "commander";
import show from "./commands.show";
/**
 * init 디렉토리명
 * add 디렉토리명
 * status 디렉토리명
 * commit 디렉토리명
 * log 디렉토리명
 * restore 디렉토리명 {8자리 | 64자리 커밋해시값}
 */
(function processingArguments() {
    if (!process.argv[3]) {
        process.argv[3] = ".";
    } else if (isHash(process.argv[3]) || isShortHash(process.argv[3])) {
        [process.argv[3], process.argv[4]] = [".", process.argv[3]];
    }
})();

type Func = (...args: any[]) => void;
const commands: [Func, string][] = [
    [init, "Create an empty Mit repository or reinitialize an existing one"],
    [add, "Add file contents to the index"],
    [status, "Show the working tree status"],
    [commit, "Record changes to the repository"],
    [log, "Show commit logs"],
    [checkout, "Switch branches or restore working tree files"],
    [restore, "Restore working tree files"],
    [show, "Show various types of objects"],
];

const program = new Command();

commands.forEach(([func, description]) => {
    program.command(func.name).description(description).action(func);
});
program.version("1.0.0").description("CLI for git clone").parse(process.argv);
