import { Socket } from "node:net";
import DefaultDict from "./collections.DefaultDict";

export const checkedIn = new Map();

export const groups = new DefaultDict(() => []);

export let groupId = 1;

export function messageToPeer(id, camperId) {
  groups[id].forEach((peer) => {
    console.log(peer);
    peer.write(`${camperId} is getting Out!`);
  });
}

export function pushToGroups(camperId: string, client: Socket) {
  if (checkedIn.has(camperId)) {
    throw "ID_ALREADY";
  }

  checkedIn.set(camperId, groupId);

  groups[groupId].push(client);

  if (groups[groupId].length >= 4) {
    groupId++;
  }

  client.write(`checkin success to group#${groupId}\n`);
}

export function popFromGroups(camperId, client) {
  const newId = checkedIn.get(camperId);

  groups[newId] = groups[newId].filter((group) => {
    return group !== client;
  });

  return newId;
}
