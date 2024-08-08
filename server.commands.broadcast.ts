import { broadCastPeer } from "./server.groupManager";

export function broadCast(camperId: string, text: string) {
    broadCastPeer(camperId, text);
}
