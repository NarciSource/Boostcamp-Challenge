import { getGroupMembers, getGroupId, getSocket, popMember, CamperId } from "./server.groupManager";
import Response from "./protocol.Response";

export function checkout(camperId: CamperId): void {
    const groupId = getGroupId(camperId);
    const groupMembers = getGroupMembers(groupId);

    popMember(camperId);

    const message = `${camperId} is getting Out!`;
    const header = {
        code: 200,
        time: Date.now(),
        "Content-Type": "application/json",
        "Content-Length": message.length,
    };
    const body = { data: message };
    const transferMessage = new Response(header, body);

    const sockets = groupMembers.map((member) => getSocket(member));
    for (const peer of sockets) {
        peer.write(JSON.stringify(transferMessage));
    }
}
