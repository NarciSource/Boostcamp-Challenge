import makeMessageResponse from "./server.makeMessageResponse";
import { CamperId, getGroupId, getSocket } from "./server.manager.camper";
import { getGroupMembers } from "./server.manager.group";

export default function broadcast(camperId: CamperId, message: string): void {
    const groupId = getGroupId(camperId);
    const groupMembers = getGroupMembers(groupId);
    const sockets = groupMembers.map((member) => getSocket(member));

    const capsuledMessage = makeMessageResponse(message);

    for (const peer of sockets) {
        peer.write(capsuledMessage);
    }
}
