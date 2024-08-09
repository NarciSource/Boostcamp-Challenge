import { Socket } from "node:net";
import { CamperId } from "./server.type";
import checkin from "./server.commands.checkin";
import checkout from "./server.commands.checkout";
import summary from "./server.commands.summary";
import chat from "./server.commands.chat";
import broadcast from "./server.commands.broadcast";
import finish from "./server.commands.finish";
import direct from "./server.commands.direct";
import clap, { clapHands } from "./server.commands.clap";
import { verifyAuthentication } from "./server.middleware.auth";
import { validateStringBounds } from "./server.middleware.validation";

const commands = {
    checkin,
    checkout,
    summary,
    chat,
    broadcast,
    finish,
    direct,
    clap,
};

export default function runCommand(
    command: string,
    arg: any,
    camperId: CamperId,
    client: Socket,
): any {
    validateStringBounds(arg);

    clapHands();

    verifyAuthentication({ camperId, ...arg });

    const data = commands[command]({ camperId, client, ...arg });
    return data;
}
