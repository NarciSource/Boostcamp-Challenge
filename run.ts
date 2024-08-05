import fs from "fs";
import RequestObject from "./objects.Request";

export default function run(filename: string) {
    const file = fs.readFileSync(filename, "utf8");

    const requestObject = RequestObject.parse(file);
    console.log(requestObject);
}
