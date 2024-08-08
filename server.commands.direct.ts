import { checkedIn } from "./server.groupManager";

export function direct(camperId: string, message: string) {
    const { client } = checkedIn.get(camperId);

    client.write(JSON.stringify({ message, time: Date.now(), length: message.length }));
}
