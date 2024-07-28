import { parentPort } from "worker_threads";
import AsyncEventEmitter from "./EventEmitter.Async.js";
import DelayEventEmitter from "./EventEmitter.Delay.js";
import SyncEventEmitter from "./EventEmitter.Sync.js";
import Event from "./event.js";

const syncQueue = new SyncEventEmitter();
const asyncQueue = new AsyncEventEmitter();
const delayQueue = new DelayEventEmitter();

parentPort.on("message", ({ command, args }) => {
    switch (command) {
        case "addEvent": {
            const { subscriber, eventName, handler, emitter_type, delay } =
                args;

            const emitter = (() => {
                switch (emitter_type) {
                    case "sync":
                        return syncQueue;
                    case "async":
                        return asyncQueue;
                    case "delay":
                        return delayQueue;
                }
            })();

            const managersGuide = { subscriber, emitter_type, delay };

            emitter.on(
                eventName,
                (event, userInfo) =>
                    new Function("return " + handler)()(
                        event.run(userInfo),
                        managersGuide,
                    ),
                delay,
            );

            break;
        }
        case "triggerEvent": {
            const { eventName, publisher, userInfo } = args;
            const event = new Event(eventName, publisher);

            triggerHandler({ ...args, publisher });

            delayQueue.emit(eventName, event, userInfo);
            asyncQueue.emit(eventName, event, userInfo);
            syncQueue.emit(eventName, event, userInfo);
            break;
        }
    }
});

const triggerHandler = ({ eventName, publisher }) => {
    console.log(
        `// ${eventName || "all"} post "${publisher.name}"`,
        new Date().toLocaleTimeString(),
    );
};
