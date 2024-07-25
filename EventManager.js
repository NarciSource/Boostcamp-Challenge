import Event from "./event.js";

export default class EventManager {
    table;

    constructor() {
        if (EventManager.instance) {
            return EventManager.instance;
        }

        this.table = new Map();
        Event.instance = this;
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
    }

    remove(subscriber) {
        const keys = Array.from(this.table.keys()).filter(
            (row) => row.subscriber === subscriber,
        );

        keys.forEach((key) => this.table.delete(key));
    }

    postEvent(eventName, sender, userInfo = undefined) {
        const matched = Array.from(this.table.keys())
            .filter((row) => {
                return (
                    (row.sender === sender && row.eventName === eventName) ||
                    (row.sender === sender && row.eventName === "") ||
                    (row.sender === undefined && row.eventName === eventName) ||
                    (row.sender === undefined && row.eventName === "")
                );
            })
            .map((key) => ({ ...key, handler: this.table.get(key) }));

        matched.forEach((m) => {
            const { subscriber, eventName, sender, handler } = m;

            console.log("Event 실행", subscriber.name, handler);
        });
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
