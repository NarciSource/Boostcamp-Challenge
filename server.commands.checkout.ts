import { popFromGroups, messageToPeer } from "./server.groupManager";

export function checkOut(camperId, client) {
  const id = popFromGroups(camperId, client);

  let message = "CheckOut";
  client.write(JSON.stringify({ message, time: Date.now(), length: message.length }));

  messageToPeer(id, camperId);
}
