import { Socket } from "node:net";
import DefaultDict from "./collections.DefaultDict";

export const checkedIn = new Map<string, { groupId: number; client: Socket }>();

export const groups = new DefaultDict<Socket[]>(() => []);

export let groupId = 1;

export function messageToPeer(id: number, camperId: string): void {
    groups[id].forEach((peer: Socket) => {
        console.log(peer);
        let message = `${camperId} is getting Out!`;
        peer.write(JSON.stringify({ message, time: Date.now(), length: message.length }));
    });
}

export function pushToGroups(camperId: string, client: Socket): number {
    if (checkedIn.has(camperId)) {
        throw "ID_ALREADY";
    }

    checkedIn.set(camperId, { groupId, client });

    groups[groupId].push(client);

    if (groups[groupId].length >= 4) {
        groupId++;
    }

    return groupId;
}

export function popFromGroups(camperId: string, client: Socket): number {
    const { groupId } = checkedIn.get(camperId);

    groups[groupId] = groups[groupId].filter((group: Socket) => {
        return group !== client;
    });

    return groupId;
}

export function broadCastPeer(camperId: string, text: string): void {
    const { groupId } = checkedIn.get(camperId);

    groups[groupId].forEach((peer: Socket) => {
        peer.write(text);
    });
}
