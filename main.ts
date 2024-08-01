import init from "./commands.init";
import add from "./commands.add";
import status from "./commands.status";
import commit from "./commands.commit";
import log from "./commands.log";

export type Path = string;

/**
 * init 디렉토리명
 * add 디렉토리명
 * status 디렉토리명
 * commit 디렉토리명
 * log 디렉토리명
 * restore 디렉토리명 {8자리 | 64자리 커밋해시값}
 */

const commands = { init, add, status, commit, log };
commands[process.argv[2]]();
