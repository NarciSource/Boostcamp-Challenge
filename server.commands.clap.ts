import { Socket } from "node:net";
import makeMessageResponse from "./server.makeMessageResponse";

export let clapCount = 0;

export function countClap() {
    clapCount++;
}

export default function clap({ client }: { client: Socket }): void {
    const message = `clap count is ${clapCount}`;

    const capsuledMessage = makeMessageResponse(message);

    client.write(capsuledMessage);
}
