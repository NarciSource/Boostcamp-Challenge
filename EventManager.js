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

    add(subscriber, eventName, sender, handler) {
        this.table.set({ subscriber, eventName, sender }, handler);

        this.eventEmitter.on({ eventName, sender }, (data) => {
            console.log(handler, data);
        });
    }

    remove(subscriber) {
        const keys = Array.from(this.table.keys()).filter(
            (row) => row.subscriber === subscriber,
        );

        keys.forEach((key) => this.table.delete(key));
    }

    postEvent(eventName, sender, userInfo = undefined) {
        const matched = new Map();

        Array.from(this.table.keys())
            .filter((row) => {
                return (
                    (row.sender === sender && row.eventName === eventName) ||
                    (row.sender === sender && eventName === "") ||
                    (row.sender === undefined && row.eventName === eventName) ||
                    (row.sender === undefined && eventName === "")
                );
            })
            .forEach(({ sender, eventName }) =>
                matched.set(JSON.stringify({ sender, eventName }), {
                    sender,
                    eventName,
                }),
            );

        matched.forEach(({ eventName, sender }) =>
            this.eventEmitter.emit({ eventName, sender }, userInfo),
        );
    }

    stringify() {
        return Array.from(this.table.keys())
            .map(({ eventName, sender }, index) => {
                return `Subscriber#${
                    index + 1
                } : event name = "${eventName}", sender = ${sender.name}`;
            })
            .join("\n");
    }
}
