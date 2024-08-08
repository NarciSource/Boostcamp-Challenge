import { CamperId, GroupId, GroupInform } from "./server.type";
import DefaultDict from "./collections.DefaultDict";

const initial = (): GroupInform => ({ groupMembers: [], enableChat: false, maxCount: Infinity });

const groupsDictionary = new DefaultDict<GroupInform>(initial);

export function getGroupMembers(id: GroupId): CamperId[] {
    return groupsDictionary[id].groupMembers;
}

let sizeOfGroups = 0;

export function setGroup(camperId: CamperId): GroupId {
    if (getGroupMembers(sizeOfGroups).length >= 4) {
        sizeOfGroups++;
    }

    groupsDictionary[sizeOfGroups].groupMembers.push(camperId);
    return sizeOfGroups;
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
