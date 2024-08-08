import fs from "fs";
import { Socket } from "node:net";
import makeMessageResponse from "./server.makeMessageResponse";

export default function summary(day: string, client: Socket) {
    const raw = fs.readFileSync("./keywords.json", "utf-8");
    const json: { [key: string]: string } = JSON.parse(raw);
    const keyword = json[day];
    const message = keyword.toString();

    const capsuledMessage = makeMessageResponse(message);

    client.write(capsuledMessage);
}
