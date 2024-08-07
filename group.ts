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

  checkedIn.set(camperId, { groupId, client });

  groups[groupId].push(client);

  if (groups[groupId].length >= 4) {
    groupId++;
  }

  client.write(`checkin success to group#${groupId}\n`);
}

export function popFromGroups(camperId, client) {
  const { groupId } = checkedIn.get(camperId);

  groups[groupId] = groups[groupId].filter((group) => {
    return group !== client;
  });

  return groupId;
}

export function broadCastPeer(camperId, text) {
  const { groupId } = checkedIn.get(camperId);

  groups[groupId].forEach((peer) => {
    peer.write(text);
  });
}
