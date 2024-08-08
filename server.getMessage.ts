import { Socket } from "node:net";
import { sendError } from "./server.sendError";
import { countClap } from "./server.commands.clap";
import runCommand from "./server.runCommand";

const encoder = new TextEncoder();

export default function getMessageFor(client: Socket) {
    return (data: Buffer) => getMessage(data, client);
}
function getMessage(data: Buffer, client: Socket) {
    const { header: requestHeader, body: requestBody } = JSON.parse(data.toString());
    const requestMessage = requestBody.data;

    const view = encoder.encode(requestMessage);

    let message; 

    try {
        if (view.length <= 1024 && requestMessage.length >= 4) {
            countClap();
            const [, command, arg] = /^(\w+)\s(.*)/.exec(requestMessage);

            const data = runCommand(command, arg, client);

            message = { data };
        }
    } catch (error) {
       message = sendError(error);
    }

    client.write(JSON.stringify(message));
}
