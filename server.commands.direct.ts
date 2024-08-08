import postMessage from "./server.postMessage";
import { getSocket } from "./server.manager.camper";

export default function direct(targetId: string, message: string): void {
    const target = getSocket(targetId);

    postMessage(target)(message);
}
