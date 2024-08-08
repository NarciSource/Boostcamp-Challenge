import { CamperId, getGroupId, getSocket } from "./server.manager.camper";
import { enableChat, getGroupMembers } from "./server.manager.group";
import postMessage from "./server.postMessage";

export default function chat({
    camperId,
    maxCount,
}: {
    camperId: CamperId;
    maxCount: number;
}): void {
    const groupId = getGroupId(camperId);
    enableChat(groupId, maxCount);

    const broadcastMessage = `broadcast from server, "채팅이 시작되었습니다"`;
    const groupMembers = getGroupMembers(groupId);
    const sockets = groupMembers.map(getSocket);

    for (const peer of sockets) {
        postMessage(peer)(broadcastMessage);
    }
}
