import fs from "fs";
import { Socket } from "node:net";

export function summary(day: string, client: Socket) {
    const raw = fs.readFileSync("./keywords.json", "utf-8");
    const json: { [key: string]: string } = JSON.parse(raw);
    const keyword = json[day];
    const message = keyword.toString();

    client.write(JSON.stringify({ message, time: Date.now(), length: message.length }));
}
