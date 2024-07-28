import { parentPort } from "worker_threads";
import AsyncEventEmitter from "./EventEmitter.Async.js";
import DelayEventEmitter from "./EventEmitter.Delay.js";
import SyncEventEmitter from "./EventEmitter.Sync.js";

const syncQueue = new SyncEventEmitter();
const asyncQueue = new AsyncEventEmitter();
const delayQueue = new DelayEventEmitter();

parentPort.on("message", ({ command, args }) => {
    switch (command) {
        case "addEvent": {
            const {
                subscriber,
                eventName,
                publisher,
                handler,
                emitter_type,
                delay,
            } = args;

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
                { eventName, publisher },
                (event, userInfo) =>
                    new Function("return " + handler)()(
                        event,
                        userInfo,
                        managersGuide,
                    ),
                delay,
            );

            break;
        }
        case "triggerEvent": {
            const { eventName, publisher, event, userInfo } = args;

            triggerHandler({ ...args, publisher });

            delayQueue.emit({ eventName, publisher }, event, userInfo);
            asyncQueue.emit({ eventName, publisher }, event, userInfo);
            syncQueue.emit({ eventName, publisher }, event, userInfo);
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
