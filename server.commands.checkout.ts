import { Socket } from "node:net";
import { popFromGroups, messageToPeer } from "./server.groupManager";

export function checkout(camperId: string, client: Socket): string {
    const id = popFromGroups(camperId, client);

    messageToPeer(id, camperId);

    const message = `CheckOut ${id}`;
    return message;
}
