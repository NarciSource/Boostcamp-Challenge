import fs from "fs";
import { CommandArg } from "./server.type";
import postMessage from "./server.postMessage";

export default function summary({ day, client, camperId }: CommandArg) {
    const raw = fs.readFileSync("./keywords.json", "utf-8");
    const json: { [key: string]: string } = JSON.parse(raw);
    const keyword = json[day].toString();

    postMessage(client)(`keywords are ${keyword}`);

    console.log(`summary from ${camperId} : ${day} => '${keyword}'`);
}
