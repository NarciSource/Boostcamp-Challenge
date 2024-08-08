import { Socket } from "node:net";
import { GroupId, popGroup, setGroup } from "./server.manager.group";
import { code } from "./server.code";

export type CamperId = string;

const membersDictionary = new Map<CamperId, { groupId: GroupId; socket: Socket }>();

export function getGroupId(camperId: CamperId): GroupId {
    return membersDictionary.get(camperId)?.groupId;
}

export function getSocket(camperId: CamperId): Socket {
    return membersDictionary.get(camperId)?.socket;
}

export function setMembers(camperId: CamperId, socket: Socket): GroupId {
    if (membersDictionary.has(camperId)) {
        throw code.ID_ALREADY_EXISTS;
    }

    const groupId = setGroup(camperId);

    membersDictionary.set(camperId, { groupId, socket });

    return groupId;
}

export function popMember(camperId: CamperId): void {
    const groupId = getGroupId(camperId);

    popGroup(camperId, groupId);

    membersDictionary.delete(camperId);
}
