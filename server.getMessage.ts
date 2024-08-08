import { Socket } from "node:net";
import Response, { Header } from "./protocol.Response";
import sendError from "./server.sendError";
import runCommand from "./server.runCommand";
import makeMessageResponse from "./server.makeMessageResponse";
import { countClap } from "./server.commands.clap";
import { getBytes } from "./utils";

export default function getMessageFor(client: Socket) {
    return (buffer: Buffer) => getMessage(buffer, client);
}

function getMessage(buffer: Buffer, client: Socket) {
    const { header: requestHeader, body: requestBody } = JSON.parse(buffer.toString());
    const requestMessage = requestBody.data;

    let capsuledMessage: string;

    try {
        if (requestMessage.length < 4 || getBytes(requestMessage) > 1024) {
            throw "Message size limit exceeded";
        }
        countClap();

        const [, command, arg] = /^(\w+)\s(.*)/.exec(requestMessage);

        const message = runCommand(command, arg, client);

        capsuledMessage = makeMessageResponse(message);
    } catch (error) {
        const errorMessage = sendError(error);

        const header: Header = {
            code: 400,
            time: Date.now(),
            errorMessage,
        };
        const response = new Response(header);
        capsuledMessage = JSON.stringify(response);
    }

    client.write(capsuledMessage);
}
