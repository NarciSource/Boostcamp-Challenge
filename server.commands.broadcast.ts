import Response from "./protocol.Response";
import { CamperId, getGroupId, getSocket } from "./server.manager.camper";
import { getGroupMembers } from "./server.manager.group";

export function broadCast(camperId: CamperId, message: string) {
    const groupId = getGroupId(camperId);
    const groupMembers = getGroupMembers(groupId);

    const sockets = groupMembers.map((member) => getSocket(member));
    const header = {
        code: 200,
        time: Date.now(),
        "Content-Type": "application/json",
        "Content-Length": message.length,
    };
    const body = { data: message };
    const transferMessage = new Response(header, body);

    for (const peer of sockets) {
        peer.write(JSON.stringify(transferMessage));
    }
}
