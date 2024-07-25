import { parentPort } from "worker_threads";
import EventManager from "./EventManager.js";

parentPort.on("message", ({ subscriber, eventName }) => {
    const eventManager = EventManager.sharedInstance();

    eventManager.postEvent(eventName, subscriber);

    parentPort.postMessage("done");
});
