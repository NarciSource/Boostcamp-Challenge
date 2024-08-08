import makeMessageResponse from "./server.makeMessageResponse";
import { getSocket } from "./server.manager.camper";

export default function direct(targetId: string, message: string): void {
    const target = getSocket(targetId);

    const capsuledMessage = makeMessageResponse(message);

    target.write(capsuledMessage);
}
