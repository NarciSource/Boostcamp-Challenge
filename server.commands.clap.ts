import { Socket } from "node:net";
import postMessage from "./server.postMessage";

export let clapCount = 0;

export function countClap() {
    clapCount++;
}

export default function clap({ client }: { client: Socket }): void {
    const message = `clap count is ${clapCount}`;

    postMessage(client)(message);
}
