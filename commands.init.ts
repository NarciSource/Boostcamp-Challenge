import fs from "fs";
import { Path } from "./main";

/**
 * 디렉토리명/.mit/objects/
 * 디렉토리명/.mit/index/
 * https://www.geeksforgeeks.org/node-js-fs-mkdir-method/
 */
export default function init(directoryPath: Path) {
    fs.mkdir(`${directoryPath}/.mit/objects`, { recursive: true }, (error) => {
        console.log(error);
    });
    fs.writeFileSync(`${directoryPath}/.mit/index`, "");
}
