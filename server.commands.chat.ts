import { CommandArg } from "./server.type";
import { getGroupId, getSocket } from "./server.manager.camper";
import { enableChat, getGroupMembers } from "./server.manager.group";
import postMessage from "./server.postMessage";

export default function chat({ camperId, maxCount }: CommandArg): void {
    const groupId = getGroupId(camperId);
    enableChat(groupId, maxCount);

    const groupMembers = getGroupMembers(groupId);
    const sockets = groupMembers.map(getSocket);

    for (const peer of sockets) {
        postMessage(peer)(`broadcast from server, "채팅이 시작되었습니다"`);
    }
    console.log(`broadcast to group#${groupId} => "채팅이 시작되었습니다", from="server"`);
}
