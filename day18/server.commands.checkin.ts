import { CamperId, CommandArg } from "./server.type";
import { code } from "./server.code";
import { setMembers } from "./server.manager.camper";
import postMessage from "./server.postMessage";

export default function checkin({ camperId, client }: CommandArg): CamperId {
    const idNumberPart = parseInt(camperId.slice(1));

    if (idNumberPart > 256) {
        throw code.INVALID_ID;
    }

    const groupId = setMembers(camperId, client);

    postMessage(client)({ message: `Checkin success to group#${groupId}`, extra: "checkin" });

    console.log(
        `checkin ${camperId} (success) from ${client.remoteAddress}:${client.remotePort} => group#${groupId}`,
    );

    return camperId;
}
