import { CamperId, getGroupId } from "./server.manager.camper";
import { enableChat } from "./server.manager.group";

export default function chat({
    camperId,
    maxCount,
}: {
    camperId: CamperId;
    maxCount: number;
}): void {
    const groupId = getGroupId(camperId);
    enableChat(groupId, maxCount);
}
