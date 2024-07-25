import EventEmitter from "events";
import PromiseEventEmitter from "./PromiseEventEmitter.js";

export default class EventManager {
    table;
    syncEmitter;
    asyncEmitter;

    constructor() {
        if (EventManager.instance) {
            return EventManager.instance;
        }

        this.table = new Map();
        this.syncEmitter = new EventEmitter();
        this.asyncEmitter = new PromiseEventEmitter();
        EventManager.instance = this;
    }

    static instance;
    static sharedInstance() {
        if (!EventManager.instance) {
            EventManager.instance = new EventManager();
        }
        return EventManager.instance;
    }

    add({ subscriber, eventName, publisher, handler, emitter_type }) {
        this.table.set({ subscriber, eventName, publisher }, handler);

        const emitter =
            emitter_type === "sync" ? this.syncEmitter : this.asyncEmitter;

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

    postEvent({ eventName, publisher, userInfo = undefined, async = false }) {
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

        const emitter = async ? this.asyncEmitter : this.syncEmitter;

        matched.forEach(({ eventName, publisher }) =>
            emitter.emit({ eventName, publisher }, userInfo),
        );
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
