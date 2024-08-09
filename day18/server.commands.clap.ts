import { CommandArg } from "./server.type";
import postMessage from "./server.postMessage";

export let clapCount = 0;

export function clapHands() {
    clapCount++;
}

export default function clap({ client, camperId }: CommandArg): void {
    postMessage(client)(`clap count is ${clapCount}`);

    console.log(`clap from ${camperId} => ${clapCount}`);
}
