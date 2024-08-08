import postMessage from "./server.postMessage";
import { CamperId, getGroupId, getSocket } from "./server.manager.camper";
import { chatCount, chatOneTime, getGroupMembers, isEnableChat } from "./server.manager.group";
import { code } from "./server.code";

export default function broadcast(camperId: CamperId, message: string): void {
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
    const groupMembers = getGroupMembers(groupId);
    const sockets = groupMembers.map((member) => getSocket(member));

    for (const peer of sockets) {
        postMessage(peer)(message);
    }
}
