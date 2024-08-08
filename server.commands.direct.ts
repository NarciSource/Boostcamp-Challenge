import Response from "./protocol.Response";
import { getSocket } from "./server.groupManager";

export function direct(targetId: string, message: string): void {
    const target = getSocket(targetId);

    const header = {
        code: 200,
        time: Date.now(),
        "Content-Type": "application/json",
        "Content-Length": message.length,
    };
    const body = { data: message };
    const transferMessage = new Response(header, body);

    target.write(JSON.stringify(transferMessage));
}
