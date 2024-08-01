import fs from "fs";

const directoryPath = process.argv[3] || ".";

/**
 * 디렉토리명/.mit/objects/
 * 디렉토리명/.mit/index/
 * https://www.geeksforgeeks.org/node-js-fs-mkdir-method/
 */
export default function init() {
    fs.mkdir(`${directoryPath}/.mit/objects`, { recursive: true }, (error) => {
        console.log(error);
    });
    fs.writeFileSync(`${directoryPath}/.mit/index`, "");
    fs.writeFileSync(`${directoryPath}/.mit/HEAD`, "");
    fs.writeFileSync(`${directoryPath}/.mit/commits`, "");
}
