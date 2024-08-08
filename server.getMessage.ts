import { Socket } from "node:net";
import { sendError } from "./server.sendError";
import { countClap } from "./server.commands.clap";
import Response, { Body, Header } from "./protocol.Response";
import runCommand from "./server.runCommand";
import { getBytes } from "./utils";

export default function getMessageFor(client: Socket) {
    return (buffer: Buffer) => getMessage(buffer, client);
}

function getMessage(buffer: Buffer, client: Socket) {
    const { header: requestHeader, body: requestBody } = JSON.parse(buffer.toString());
    const message = requestBody.data;

    let body: Body;
    let header: Header;

    try {
        if (message.length < 4 || getBytes(message) > 1024) {
            throw "Message size limit exceeded";
        }

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
