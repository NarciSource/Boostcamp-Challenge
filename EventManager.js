import { Worker } from "worker_threads";

export default class EventManager {
    table = new Map();
    eventMap = new Map();
    publisher_threads = {};

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

        const worker = (this.publisher_threads[publisher.name] =
            this.publisher_threads[publisher.name] ||
            new Worker("./worker.js"));

        worker.postMessage({
            command: "addEvent",
            args: {
                subscriber,
                eventName,
                publisher,
                handler: handler.toString(),
                emitter_type,
                delay,
            },
        });
    }

    remove(subscriber) {
        const keys = Array.from(this.table.keys()).filter(
            (row) => row.subscriber === subscriber,
        );

        keys.forEach((key) => this.table.delete(key));
    }

    postEvent({ eventName, publisher, completed, userInfo = undefined }) {
        // expand including select all
        const expanded = Array.from(this.table.keys())
            .filter(
                (row) =>
                    (row.publisher.name === publisher.name ||
                        !publisher.name) &&
                    (row.eventName === eventName || eventName === ""),
            )
            .map(({ eventName, publisher }) => ({ eventName, publisher }));

        // filter completed events
        const incomplete = expanded.filter((key) => {
            const key_string = JSON.stringify(key);

            return !this.eventMap.get(key_string);
        });

        // set incomplete events to eventMap
        for (const key of incomplete) {
            const key_string = JSON.stringify(key);

            this.eventMap.set(key_string, completed);
        }

        // filter duplicates by object-key
        const filtered = new Map(
            incomplete.map((key) => [JSON.stringify(key), key]),
        ).values();

        // trigger
        const worker = this.publisher_threads[publisher.name];

        for (const { eventName, publisher } of filtered) {
            worker.postMessage({
                command: "triggerEvent",
                args: {
                    eventName,
                    publisher,
                    userInfo,
                },
            });
        }
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
