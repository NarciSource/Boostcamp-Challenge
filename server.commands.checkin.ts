import { Socket } from "node:net";
import { code } from "./server.code";
import { CamperId, setMembers } from "./server.manager.camper";
import makeMessageResponse from "./server.makeMessageResponse";

export default function checkin({
    camperId,
    client,
}: {
    camperId: CamperId;
    client: Socket;
}): CamperId {
    const idNumberPart = parseInt(camperId.slice(1));

    if (idNumberPart > 256) {
        throw code.INVALID_ID;
    }

    const groupId = setMembers(camperId, client);

    const message = `checkin success to group#${groupId}\n`;
    const capsuledMessage = makeMessageResponse(message);

    client.write(capsuledMessage);

    return camperId;
}
