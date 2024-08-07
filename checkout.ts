import { popFromGroups, messageToPeer } from "./group";


export function checkOut(camperId, client) {
  const id = popFromGroups(camperId, client);
  
  messageToPeer(id, camperId);
}
