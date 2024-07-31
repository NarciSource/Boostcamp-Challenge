// init 디렉토리명
// add 디렉토리명
// status 디렉토리명
// commit 디렉토리명
// log 디렉토리명
// restore 디렉토리명 {8자리 | 64자리 커밋해시값}
// https://www.npmjs.com/package/commander

const [command, directoryPath, hashValue] = process.argv;

switch (command) {
    case "init":
        //init();
        break;
    case "add":
        break;
    case "status":
        break;
    case "log":
        break;
    case "restore":
        break;
    default:
        break;
}
