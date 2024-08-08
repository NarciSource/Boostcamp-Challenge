import { Socket } from "node:net";
import { CamperId, setMembers } from "./server.manager.camper";
import { code } from "./server.code";

export default function checkin(camperId: CamperId, client: Socket): string {
    const idNumberPart = parseInt(camperId.slice(1));
    if (idNumberPart > 256) {
        throw code.INVALID_ID;
    }

    const groupId = setMembers(camperId, client);

    const message = `checkin success to group#${groupId}\n`;
    return message;
}
