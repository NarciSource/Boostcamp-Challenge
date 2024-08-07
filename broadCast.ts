import { broadCastPeer } from "./group";

export function broadCast(camperId, text) {
  broadCastPeer(camperId, text);
}
