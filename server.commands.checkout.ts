import { Socket } from "node:net";
import { popFromGroups, messageToPeer } from "./server.groupManager";

export function checkOut(camperId: string, client: Socket) {
    const id = popFromGroups(camperId, client);

    let message = "CheckOut";
    client.write(JSON.stringify({ message, time: Date.now(), length: message.length }));

    messageToPeer(id, camperId);
}
