import { Socket } from "node:net";
import { checkin } from "./server.commands.checkin";
import { checkout } from "./server.commands.checkout";
import clap from "./server.commands.clap";
import { direct } from "./server.commands.direct";
import { summary } from "./server.commands.summary";

const commands = {
    checkin,
    checkout,
    clap,
    direct,
    summary,
};

let maxCount: number;
let currentCount: number;
let isChat = false;

export default function runCommand(command: string, arg: any, client: Socket): string {
    if (command === "chat") {
        currentCount = 0;
        maxCount = parseInt(arg);
        isChat = true;
    } else if (command === "finish") {
        isChat = false;
    } else if (command === "broadcast") {
        if (!maxCount || currentCount > maxCount) {
            throw "maxCountOver";
        } else if (!isChat) {
            throw "notIsChat";
        } else {
            currentCount++;
        }
    }

    const message = commands[command](arg, client);
    return message;
}
