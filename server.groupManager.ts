import { Socket } from "node:net";
import DefaultDict from "./collections.DefaultDict";

export type CamperId = string;
export type GroupId = number;

const membersDictionary = new Map<CamperId, { groupId: GroupId; socket: Socket }>();

const groupsDictionary = new DefaultDict<CamperId[]>(() => []);

export function getGroupMembers(id: GroupId): CamperId[] {
    return groupsDictionary[id];
}

export function getGroupId(id: CamperId): GroupId {
    return membersDictionary[id].groupId;
}

export function getSocket(id: CamperId): Socket {
    return membersDictionary[id].socket;
}

let sizeOfGroups = 0;

export function setMembers(id: CamperId, socket: Socket): GroupId {
    if (getGroupMembers(sizeOfGroups).length >= 4) {
        sizeOfGroups++;
    }

    const groupId = sizeOfGroups;

    if (membersDictionary.has(id)) {
        throw "ID_ALREADY";
    }

    membersDictionary.set(id, { groupId, socket });

    return groupId;
}

export function popMember(id: CamperId): void {
    const groupId = getGroupId(id);

    groupsDictionary[groupId] = groupsDictionary[groupId].filter(
        (memberId: CamperId) => memberId !== id,
    );

    membersDictionary.delete(id);
}
