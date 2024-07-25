import Event from "./event.js";
import { Worker } from "worker_threads";

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

    // 수정필요
    remove(subscriber) {
        this.table = this.table.filter((sub) => sub.subscriber !== subscriber);
    }

    postEvent(eventName, sender, userInfo = undefined) {
        const event = new Event(eventName, sender, userInfo);

        const matched = Array.from(this.table.keys())
            .filter((row) => {
                return (
                    row.eventName === eventName ||
                    row.eventName === "" ||
                    row.sender === sender ||
                    row.sender === undefined
                );
            })
            .map((key) => ({ ...key, handler: this.table.get(key) }));
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
