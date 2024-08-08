import { CommandArg } from "./server.type";
import postMessage from "./server.postMessage";
import { getSocket } from "./server.manager.camper";

export default function direct({ camperId, targetId, message, client }: CommandArg): void {
    const target = getSocket(targetId);

    const directMessage = `dm from ${camperId}, "${message}"`;

    postMessage(target)(directMessage);
    postMessage(client)("direct (success)");
}
