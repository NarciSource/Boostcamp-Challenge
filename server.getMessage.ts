import { checkIn } from "./server.commands.checkin";
import { summary } from "./server.commands.summary";
import { broadCast } from "./server.commands.broadcast";
import { direct } from "./server.commands.direct";
import { sendError } from "./server.sendError";
import { countClap, clap } from "./server.commands.clap";
import { checkOut } from "./server.commands.checkout";

let maxCount;
let currentCount;
let isChat = false;
let loggedIn;

const encoder = new TextEncoder();

export default function getMessageFor(client) {
    return (data) => getMessage(data, client);
}
function getMessage(data: Buffer, client) {
    let message = data.toString();
    const view = encoder.encode(message);
    console.log(message);

    try {
        if (view.length <= 1024 && message.length >= 4) {
            countClap();
            const [cmd, ...params] = message.split(/\s/);
            console.log(cmd, ...params);
            switch (cmd) {
                case "checkin":
                    checkIn(params[0], client);
                    loggedIn = params[0];
                    break;
                case "checkout":
                    checkOut(loggedIn, client);
                    break;
                case "summary":
                    if (loggedIn) {
                        summary(params[0], client);
                    }
                    break;
                case "chat":
                    currentCount = 0;
                    maxCount = params[0];
                    isChat = true;
                    break;
                case "broadcast":
                    if (!maxCount || currentCount > maxCount) {
                        throw "maxCountOver";
                    } else if (!isChat) {
                        throw "notIsChat";
                    } else {
                        currentCount++;
                        broadCast(loggedIn, params[0]);
                    }
                    break;
                case "finish":
                    isChat = false;
                    break;
                case "direct":
                    direct(params as [string, string, string]);
                    break;
                case "clap":
                    const message = `clap count is ${clap}`;
                    client.write(
                        JSON.stringify({ message, time: Date.now(), length: message.length }),
                    );
                    break;
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
