import { Socket } from "node:net";
import Response from "./protocol.Response";

export default function postMessage(client: Socket) {
    return function (message: string) {
        const header = {
            code: 200,
            time: Date.now(),
            "Content-Type": "application/json",
            "Content-Length": message.length,
        };
        const body = message ? { data: message } : null;
        const transferMessage = new Response(header, body);

        const streamed = JSON.stringify(transferMessage);

        client.write(streamed);
    };
}
