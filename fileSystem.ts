import fs from "fs";
import { Path } from "./main";

export function readFile(filePath: Path): [Buffer, number] {
    const fileSize = fs.statSync(filePath).size;
    const fileContent = fs.readFileSync(filePath);
    return [fileContent, fileSize];
}
