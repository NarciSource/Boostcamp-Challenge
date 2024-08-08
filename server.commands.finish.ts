import { CamperId, getGroupId } from "./server.manager.camper";
import { disableChat } from "./server.manager.group";

export default function finish({ camperId }: { camperId: CamperId }): void {
    const groupId = getGroupId(camperId);
    disableChat(groupId);
}
