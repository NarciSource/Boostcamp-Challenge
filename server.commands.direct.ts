import { CommandArg } from "./server.type";
import postMessage from "./server.postMessage";
import { getSocket } from "./server.manager.camper";

export default function direct({ camperId, targetId, message, client }: CommandArg): void {
    const target = getSocket(targetId);

    postMessage(target)(`dm from ${camperId}, "${message}"`);
    postMessage(client)("direct (success)");

    console.log(`direct from ${camperId} => to="${targetId}", text="${message}"`);
}
