import { Socket } from "node:net";
import { CamperId } from "./server.type";
import checkin from "./server.commands.checkin";
import checkout from "./server.commands.checkout";
import clap, { clapHands } from "./server.commands.clap";
import chat from "./server.commands.chat";
import direct from "./server.commands.direct";
import summary from "./server.commands.summary";
import broadcast from "./server.commands.broadcast";
import { getBytes } from "./utils";
import { code } from "./server.code";

const commands = {
    checkin,
    checkout,
    clap,
    chat,
    direct,
    summary,
    broadcast,
};

export default function runCommand(
    command: string,
    arg: any,
    camperId: CamperId,
    client: Socket,
): any {
    if (arg.length < 4 || getBytes(arg) > 1024) {
        throw code.MESSAGE_SIZE_EXCEED;
    }

    clapHands();

    const data = commands[command]({ camperId, client, ...arg });
    return data;
}
