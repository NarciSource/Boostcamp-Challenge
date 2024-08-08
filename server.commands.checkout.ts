import { getGroupMembers } from "./server.manager.group";
import { CamperId, getGroupId, getSocket, popMember } from "./server.manager.camper";
import makeMessageResponse from "./server.makeMessageResponse";

export function checkout(camperId: CamperId): void {
    const groupId = getGroupId(camperId);
    const groupMembers = getGroupMembers(groupId);

    popMember(camperId);

    const message = `${camperId} is getting Out!`;
    const capsuledMessage = makeMessageResponse(message);

    const sockets = groupMembers.map((member) => getSocket(member));
    for (const peer of sockets) {
        peer.write(capsuledMessage);
    }
}
