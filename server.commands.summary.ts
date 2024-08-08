import fs from "fs";
import { CommandArg } from "./server.type";
import postMessage from "./server.postMessage";

export default function summary({ day, client }: CommandArg) {
    const raw = fs.readFileSync("./keywords.json", "utf-8");
    const json: { [key: string]: string } = JSON.parse(raw);
    const keyword = json[day];
    const message = `keywords are ${keyword.toString()}`;

    postMessage(client)(message);
}
