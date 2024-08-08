import { Socket } from "node:net";
import { code } from "./server.code";
import { CamperId, setMembers } from "./server.manager.camper";
import postMessage from "./server.postMessage";

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

    postMessage(client)(`checkin success to group#${groupId}\n`);

    return camperId;
}
