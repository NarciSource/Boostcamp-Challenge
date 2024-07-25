import AsyncEventEmitter from "./EventEmitter.Async.js";
import SyncEventEmitter from "./EventEmitter.Sync.js";

export default class EventManager {
    table;
    syncQueue = new SyncEventEmitter();
    asyncQueue = new AsyncEventEmitter();

    constructor() {
        if (EventManager.instance) {
            return EventManager.instance;
        }

        this.table = new Map();
        EventManager.instance = this;
    }

    static instance;
    static sharedInstance() {
        if (!EventManager.instance) {
            EventManager.instance = new EventManager();
        }
        return EventManager.instance;
    }

    add({ subscriber, eventName, publisher, handler, emitter_type = "sync" }) {
        this.table.set({ subscriber, eventName, publisher }, handler);

        const emitter =
            emitter_type === "sync" ? this.syncQueue : this.asyncQueue;

        emitter.on({ eventName, publisher }, (data) => {
            console.log(handler, data);
        });
    }

    remove(subscriber) {
        const keys = Array.from(this.table.keys()).filter(
            (row) => row.subscriber === subscriber,
        );

        keys.forEach((key) => this.table.delete(key));
    }

    postEvent({ eventName, publisher, userInfo = undefined }) {
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
            this.syncQueue.emit({ eventName, publisher }, userInfo);
            this.asyncQueue.emit({ eventName, publisher }, userInfo);
        });
    }

    stringify() {
        return Array.from(this.table.keys())
            .map(({ eventName, publisher }, index) => {
                return `Subscriber#${
                    index + 1
                } : event name = "${eventName}", publisher = ${publisher.name}`;
            })
            .join("\n");
    }
}
