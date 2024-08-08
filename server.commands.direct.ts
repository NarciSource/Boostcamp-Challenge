import { Socket } from "node:net";
import postMessage from "./server.postMessage";
import { CamperId, getSocket } from "./server.manager.camper";

export default function direct({
    camperId,
    targetId,
    message,
    client,
}: {
    camperId: CamperId;
    targetId: CamperId;
    message: string;
    client: Socket;
}): void {
    const target = getSocket(targetId);

    const directMessage = `dm from ${camperId}, "${message}"`;

    postMessage(target)(directMessage);
    postMessage(client)("direct (success)");
}
