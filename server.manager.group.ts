import DefaultDict from "./collections.DefaultDict";
import { CamperId } from "./server.manager.camper";

export type GroupId = number;

const groupsDictionary = new DefaultDict<CamperId[]>(() => []);

export function getGroupMembers(id: GroupId): CamperId[] {
    return groupsDictionary[id];
}

export function popGroup(camperId: CamperId, groupId: GroupId) {
    groupsDictionary[groupId] = groupsDictionary[groupId].filter((id: CamperId) => id !== camperId);
}
