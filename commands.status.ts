import fs from "fs";
import { Path } from "./main";
import { hashObject, readHashDictionary } from "./hash";
import { glob } from "glob";

export default async function status(directoryPath: Path): Promise<void> {
    const key = fs.readFileSync(`${directoryPath}/.mit/index`, "utf8");

    const staging = readHashDictionary(directoryPath, key).split(",");

    const files = await glob(`${directoryPath}/**/*`, { ignore: ["node_modules/**", ".mit/**"] });

    files
        .filter((filePath) => !staging.includes(hashObject(filePath, directoryPath)))
        .forEach((filePath) => {
            console.log(filePath);
        });
}
