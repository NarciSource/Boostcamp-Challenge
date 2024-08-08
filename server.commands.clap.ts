import { CommandArg } from "./server.type";
import postMessage from "./server.postMessage";

export let clapCount = 0;

export function clapHands() {
    clapCount++;
}

export default function clap({ client }: CommandArg): void {
    const message = `clap count is ${clapCount}`;

    postMessage(client)(message);
}
