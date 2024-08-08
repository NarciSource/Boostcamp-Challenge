import { Socket } from "node:net";
import { pushToGroups } from "./server.groupManager";

export function checkIn(camperId: string, client: Socket) {
    const newId = parseInt(camperId.slice(1));

    if (newId > 256) {
        throw "ID_LARGER_THAN_256";
    }

    pushToGroups(camperId, client);
}
