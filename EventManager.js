import { Worker } from "worker_threads";

export default class EventManager {
    table = [];
    eventMap = new Map();
    publisherThreads = {};

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
        this.table.push({ subscriber, eventName, publisher });

        const worker = (this.publisherThreads[publisher.name] =
            this.publisherThreads[publisher.name] || new Worker("./worker.js"));

        worker.postMessage({
            command: "addEvent",
            args: {
                subscriber,
                eventName,
                handler: handler.toString(),
                emitter_type,
                delay,
            },
        });
    }

    remove(subscriber) {
        this.table = this.table.filter((row) => row.subscriber !== subscriber);
    }

    postEvent({ eventName, publisher, completed, userInfo = undefined }) {
        // expand including select all
        const expanded = this.table
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
        const worker = this.publisherThreads[publisher.name];

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
        return this.table
            .map(
                ({ subscriber, eventName, publisher }, index) =>
                    `Subscriber#${
                        index + 1
                    } : event name = ${eventName}, publisher = ${
                        publisher.name
                    }, subscriber = ${subscriber.name}`,
            )
            .join("\n");
    }

    offAll() {
        this.table = [];
        for (const thread of Object.values(this.publisherThreads)) {
            thread.terminate();
        }
        this.publisherThreads = {};
    }
}
