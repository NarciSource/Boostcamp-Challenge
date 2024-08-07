import { popFromGroups, messageToPeer } from "./group";


export function checkOut(camperId, client) {
  const id = popFromGroups(camperId, client);


  client.write("CheckOut")
  
  messageToPeer(id, camperId);
}
