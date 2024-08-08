import { Socket } from "node:net";
import { pushToGroups } from "./server.groupManager";

export function checkin(camperId: string, client: Socket): string {
    console.log("checkin", camperId, client)
    const newId = parseInt(camperId.slice(1));

    if (newId > 256) {
        throw "ID_LARGER_THAN_256";
    }

    const groupId = pushToGroups(camperId, client);
    const message = `checkin success to group#${groupId}\n`;
    return message;
}
