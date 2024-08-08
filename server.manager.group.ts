import DefaultDict from "./collections.DefaultDict";
import { CamperId } from "./server.manager.camper";

export type GroupId = number;

interface GroupInform {
    groupMembers: CamperId[];
    enableChat: boolean;
    maxCount: number;
}

const initial = (): GroupInform => ({ groupMembers: [], enableChat: false, maxCount: Infinity });

const groupsDictionary = new DefaultDict<GroupInform>(initial);

export function getGroupMembers(id: GroupId): CamperId[] {
    return groupsDictionary[id].groupMembers;
}

export function popGroup(camperId: CamperId, groupId: GroupId) {
    groupsDictionary[groupId].groupMembers = groupsDictionary[groupId].groupMembers.filter(
        (id: CamperId) => id !== camperId,
    );
}

export function enableChat(id: GroupId, maxCount: number): void {
    groupsDictionary[id].enableChat = true;
    groupsDictionary[id].maxCount = maxCount || Infinity;
}

export function disableChat(id: GroupId): void {
    groupsDictionary[id].enableChat = false;
    groupsDictionary[id].maxCount = Infinity;
}

export function isEnableChat(id: GroupId): boolean {
    return groupsDictionary[id].enableChat;
}

export function chatCount(id: GroupId): number {
    return groupsDictionary[id].maxCount;
}

export function chatOneTime(id: GroupId): void {
    groupsDictionary[id].maxCount--;
}
