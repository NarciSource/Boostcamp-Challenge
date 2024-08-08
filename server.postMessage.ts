import { Socket } from "node:net";
import Response from "./protocol.Response";
import { getBytes } from "./utils";

export default function postMessage(client: Socket) {
    return function (message: string | { message: string; extra: string }) {
        const header = {
            code: 200,
            time: Date.now(),
            "Content-Type": "application/json",
            "Content-Length": getBytes(message),
        };
        const body = message ? { data: message } : null;
        const transferMessage = new Response(header, body);

        const streamed = JSON.stringify(transferMessage);

        client.write(streamed);
    };
}
