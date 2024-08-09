import { Socket } from "node:net";
import { ErrorPair } from "./server.type";
import Response from "./protocol.Response";

export default function postError(client: Socket) {
    return function ({ code, errorMessage }: ErrorPair) {
        const header = {
            code,
            time: Date.now(),
            errorMessage,
        };
        const transferMessage = new Response(header);

        const streamed = JSON.stringify(transferMessage);

        client.write(streamed);
    };
}
