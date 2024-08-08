import { Socket } from "node:net";
import Response from "./protocol.Response";

export default function postError(client: Socket) {
    return function (code: number, errorMessage: string) {
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
