import { Socket } from "node:net";
import DefaultDict from "./collections.DefaultDict";

export const checkedIn = [];

export const groups = new DefaultDict(() => []);

export default groups;
export let groupId = 1;

export function pushToGroups(camperId: string, client: Socket) {
  if (checkedIn.includes(camperId)) {
    throw "ID_ALREADY";
  }

  checkedIn.push(camperId);

  groups[groupId].push(client);

  if (groups[groupId].length >= 4) {
    groupId++;
  }

  client.write(`checkin success to group#${groupId}\n`);
}
