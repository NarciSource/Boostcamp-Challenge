import { CommandArg } from "./server.type";
import postMessage from "./server.postMessage";
import { getGroupId, getSocket } from "./server.manager.camper";
import { chatCount, chatOneTime, getGroupMembers, isEnableChat } from "./server.manager.group";
import { code } from "./server.code";

export default function broadcast({ camperId, message }: CommandArg): void {
    const groupId = getGroupId(camperId);

    if (!isEnableChat(groupId)) {
        throw code.CHAT_NOT_ENABLED;
    }
    if (chatCount(groupId) === 0) {
        throw code.MAX_COUNT_OVER;
    }

    // Count the chats.
    chatOneTime(groupId);

    // Send a message to the group members.
    const broadcastMessage = `broadcast from ${camperId}, "${message}"`;
    const members = getGroupMembers(groupId);
    const sockets = members.map(getSocket);

    for (const peer of sockets) {
        postMessage(peer)(broadcastMessage);
    }
}
