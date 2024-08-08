import { CommandArg } from "./server.type";
import { getGroupId, getSocket } from "./server.manager.camper";
import { disableChat, getGroupMembers } from "./server.manager.group";
import postMessage from "./server.postMessage";

export default function finish({ camperId }: CommandArg): void {
    const groupId = getGroupId(camperId);
    disableChat(groupId);

    const groupMembers = getGroupMembers(groupId);
    const sockets = groupMembers.map(getSocket);

    for (const peer of sockets) {
        postMessage(peer)(`broadcast from server, "채팅이 종료되었습니다"`);
    }

    console.log(`finish from ${camperId}`);
}
