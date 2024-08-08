import { broadCastPeer } from "./server.groupManager";

export function broadCast(camperId, text) {
  broadCastPeer(camperId, text);
}
