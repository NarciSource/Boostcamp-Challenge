import postMessage from "./server.postMessage";
import { CamperId, getGroupId, getSocket } from "./server.manager.camper";
import { getGroupMembers } from "./server.manager.group";

export default function broadcast(camperId: CamperId, message: string): void {
    const groupId = getGroupId(camperId);
    const groupMembers = getGroupMembers(groupId);
    const sockets = groupMembers.map((member) => getSocket(member));

    for (const peer of sockets) {
        postMessage(peer)(message);
    }
}
