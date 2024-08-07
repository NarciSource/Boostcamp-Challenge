import { checkedIn } from "./group";

export function direct([, camperId, message]) {
  const { client } = checkedIn.get(camperId);

  client.write(JSON.stringify({ message, time: Date.now(), length: message.length }));
}
