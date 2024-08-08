import { Socket } from "node:net";
import { checkIn } from "./server.commands.checkin";
import { summary } from "./server.commands.summary";
import { broadCast } from "./server.commands.broadcast";
import { direct } from "./server.commands.direct";
import { sendError } from "./server.sendError";
import { countClap, clap } from "./server.commands.clap";
import { checkOut } from "./server.commands.checkout";

let maxCount: number;
let currentCount: number;
let isChat = false;
let loggedIn: string;

const encoder = new TextEncoder();

export default function getMessageFor(client: Socket) {
    return (data: Buffer) => getMessage(data, client);
}
function getMessage(data: Buffer, client: Socket) {
    let message = data.toString();
    const view = encoder.encode(message);
    console.log(message);

    try {
        if (view.length <= 1024 && message.length >= 4) {
            countClap();
            const [, command, arg] = /^(\w+)\s(.*)/.exec(message);

            switch (command) {
                case "checkin":
                    loggedIn = arg;
                    checkIn(loggedIn, client);
                    break;
                case "checkout":
                    checkOut(loggedIn, client);
                    break;
                case "summary":
                    if (loggedIn) {
                        summary(arg, client);
                    }
                    break;
                case "chat":
                    currentCount = 0;
                    maxCount = parseInt(arg);
                    isChat = true;
                    break;
                case "broadcast":
                    if (!maxCount || currentCount > maxCount) {
                        throw "maxCountOver";
                    } else if (!isChat) {
                        throw "notIsChat";
                    } else {
                        currentCount++;
                        broadCast(loggedIn, arg);
                    }
                    break;
                case "finish":
                    isChat = false;
                    break;
                case "direct": {
                    const [, peer, message] = /to (\w+) "(.*)"/.exec(arg);

                    direct(peer, message);
                    break;
                }
                case "clap": {
                    const message = `clap count is ${clap}`;

                    client.write(
                        JSON.stringify({ message, time: Date.now(), length: message.length }),
                    );
                    break;
                }
            }

            client.write(JSON.stringify({ message, time: Date.now(), length: message.length }));
            message = "";
        }
    } catch (error) {
        const message = "something went wrong.";
        client.write(JSON.stringify({ message, time: Date.now(), length: message.length }));
        sendError(error, client);
    }
}
