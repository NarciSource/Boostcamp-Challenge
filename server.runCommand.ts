import { Socket } from "node:net";
import checkin from "./server.commands.checkin";
import checkout from "./server.commands.checkout";
import clap, { countClap } from "./server.commands.clap";
import direct from "./server.commands.direct";
import summary from "./server.commands.summary";
import broadcast from "./server.commands.broadcast";
import { getBytes } from "./utils";
import { code } from "./server.code";
import { CamperId } from "./server.manager.camper";

const commands = {
    checkin,
    checkout,
    clap,
    direct,
    summary,
    broadcast,
};

let maxCount: number;
let currentCount: number;
let isChat = false;

export default function runCommand(
    command: string,
    arg: any,
    camperId: CamperId,
    client: Socket,
): any {
    if (arg.length < 4 || getBytes(arg) > 1024) {
        throw code.MESSAGE_SIZE_EXCEED;
    }

    countClap();

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

    const data = commands[command]({ camperId, client, ...arg });
    return data;
}
