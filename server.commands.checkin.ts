import { Socket } from "node:net";
import { CamperId, setMembers } from "./server.manager.camper";

export function checkin(camperId: CamperId, client: Socket): string {
    const idNumberPart = parseInt(camperId.slice(1));
    if (idNumberPart > 256) {
        throw "ID_LARGER_THAN_256";
    }

    const groupId = setMembers(camperId, client);

    const message = `checkin success to group#${groupId}\n`;
    return message;
}
