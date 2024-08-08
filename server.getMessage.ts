import { Socket } from "node:net";
import { sendError } from "./server.sendError";
import { countClap } from "./server.commands.clap";
import Response, { Body, Header } from "./protocol.Response";
import runCommand from "./server.runCommand";

const encoder = new TextEncoder();

export default function getMessageFor(client: Socket) {
    return (data: Buffer) => getMessage(data, client);
}
function getMessage(data: Buffer, client: Socket) {
    const { header: requestHeader, body: requestBody } = JSON.parse(data.toString());
    const message = requestBody.data;

    const view = encoder.encode(message);

    let body: Body;
    let header: Header;

    try {
        if (view.length <= 1024 && message.length >= 4) {
            countClap();

            const [, command, arg] = /^(\w+)\s(.*)/.exec(message);

            const data = runCommand(command, arg, client);

            header = {
                code: 200,
                time: Date.now(),
                "Content-Type": "application/json",
                "Content-Length": data.length,
            };
            body = { data };
        }
    } catch (error) {
        const errorMessage = sendError(error);
        header = {
            code: 400,
            time: Date.now(),
            errorMessage,
        };
    }

    const response = new Response(header, body);

    client.write(JSON.stringify(response));
}
