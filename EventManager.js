import EventEmitter from "events";

export default class EventManager {
    table;

    constructor() {
        if (EventManager.instance) {
            return EventManager.instance;
        }

        this.table = new Map();
        this.eventEmitter = new EventEmitter();
        EventManager.instance = this;
    }

    static instance;
    static sharedInstance() {
        if (!EventManager.instance) {
            EventManager.instance = new EventManager();
        }
        return EventManager.instance;
    }

    add({ subscriber, eventName, publisher, handler }) {
        this.table.set({ subscriber, eventName, publisher }, handler);

        this.eventEmitter.on({ eventName, publisher }, (data) => {
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

        if (async) {
            matched.forEach(({ eventName, publisher }) =>
                new Promise((resolve) => {
                    this.eventEmitter.emit({ eventName, publisher }, userInfo);
                    resolve(true);
                }).then(() => {
                    console.log("success");
                }),
            );
        } else {
            matched.forEach(({ eventName, publisher }) =>
                this.eventEmitter.emit({ eventName, publisher }, userInfo),
            );
        }
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
