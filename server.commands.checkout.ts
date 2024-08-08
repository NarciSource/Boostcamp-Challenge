import { CommandArg } from "./server.type";
import { getGroupMembers } from "./server.manager.group";
import { getGroupId, getSocket, popMember } from "./server.manager.camper";
import postMessage from "./server.postMessage";

export default function checkout({ camperId, client }: CommandArg): void {
    const groupId = getGroupId(camperId);
    const groupMembers = getGroupMembers(groupId);

    popMember(camperId);

    const sockets = groupMembers.map((member) => getSocket(member));
    for (const peer of sockets) {
        postMessage(peer)(`${camperId} is getting Out!`);
    }

    postMessage(client)({ message: "checkout (disconnected)", extra: "checkout" });

    console.log(`checkout from ${camperId} - disconnected`);
}
