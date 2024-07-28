import AsyncEventEmitter from "./EventEmitter.Async.js";
import DelayEventEmitter from "./EventEmitter.Delay.js";
import SyncEventEmitter from "./EventEmitter.Sync.js";
import Event from "./event.js";

export default class EventManager {
    table = new Map();
    eventMap = new Map();
    syncQueue = new SyncEventEmitter();
    asyncQueue = new AsyncEventEmitter();
    delayQueue = new DelayEventEmitter();

    constructor() {
        if (EventManager.instance) {
            return EventManager.instance;
        }

        EventManager.instance = this;
    }

    static instance;
    static sharedInstance() {
        if (!EventManager.instance) {
            EventManager.instance = new EventManager();
        }
        return EventManager.instance;
    }

    add({
        subscriber,
        eventName,
        publisher,
        handler,
        emitter_type = "sync",
        delay,
    }) {
        this.table.set({ subscriber, eventName, publisher }, handler);

        const emitter = (() => {
            switch (emitter_type) {
                case "sync":
                    return this.syncQueue;
                case "async":
                    return this.asyncQueue;
                case "delay":
                    return this.delayQueue;
            }
        })();

        const managersGuide = { subscriber, emitter_type, delay };

        emitter.on(
            { eventName, publisher },
            (event, userInfo) => handler(event, userInfo, managersGuide),
            delay,
        );
    }

    remove(subscriber) {
        const keys = Array.from(this.table.keys()).filter(
            (row) => row.subscriber === subscriber,
        );

        keys.forEach((key) => this.table.delete(key));
    }

    postEvent({ eventName, publisher, completed, userInfo = undefined }) {
        const key_string = JSON.stringify({ eventName, publisher });

        if (this.eventMap.get(key_string)?.completed) {
            return true;
        }
        const event = new Event(eventName, publisher, completed);
        this.eventMap.set(key_string, event);

        const matched = new Map();
        Array.from(this.table.keys())
            .filter((row) => {
                return (
                    (row.publisher.name === publisher.name &&
                        row.eventName === eventName) ||
                    (row.publisher.name === publisher.name &&
                        eventName === "") ||
                    (row.publisher.name === undefined &&
                        row.eventName === eventName) ||
                    (row.publisher.name === undefined && eventName === "")
                );
            })
            .forEach(({ eventName, publisher }) =>
                matched.set(JSON.stringify({ eventName, publisher }), {
                    publisher,
                    eventName,
                }),
            );

        matched.forEach(({ eventName, publisher }) => {
            this.delayQueue.emit({ eventName, publisher }, event, userInfo);
            this.asyncQueue.emit({ eventName, publisher }, event, userInfo);
            this.syncQueue.emit({ eventName, publisher }, event, userInfo);
        });
    }

    stringify() {
        return [
            ...this.syncQueue
                .getKeys()
                .map((arg) => ({ emit: "sync", ...arg })),
            ...this.asyncQueue
                .getKeys()
                .map((arg) => ({ emit: "async", ...arg })),
            ...this.delayQueue
                .getKeys()
                .map((arg) => ({ emit: "delay", ...arg })),
        ]
            .map(
                ({ emit, eventName, publisher }, index) =>
                    `Subscriber#${
                        index + 1
                    } : ${emit}, event name = ${eventName}, publisher = ${
                        publisher.name
                    }`,
            )
            .join("\n");
    }
}
