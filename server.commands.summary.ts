import fs from "fs";
import { Socket } from "node:net";
import postMessage from "./server.postMessage";

export default function summary({ arg: day, client }: { arg: string; client: Socket }) {
    const raw = fs.readFileSync("./keywords.json", "utf-8");
    const json: { [key: string]: string } = JSON.parse(raw);
    const keyword = json[day];
    const message = keyword.toString();

    postMessage(client)(message);
}
