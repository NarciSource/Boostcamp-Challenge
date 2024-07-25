import Event from "./event";

export default class EventManager {
    subscribers = [];

    constructor() {
        if (EventManager.instance) {
            return EventManager.instance;
        }

        this.subscribers = [];
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
        this.subscribers.push({ subscriber, eventName, sender, handler });
    }

    remove(subscriber) {
        this.subscribers = this.subscribers.filter(
            (sub) => sub.subscriber !== subscriber,
        );
    }

    postEvent(eventName, sender, userInfo = undefined) {
        const event = new Event(eventName, sender, userInfo);
        this.subscribers.forEach((sub) => {
            if (
                sub.eventName === eventName ||
                sub.eventName === "" ||
                sub.sender === sender ||
                sub.sender === undefined
            ) {
                sub.handler(event);
            }
        });
    }

    stringify() {
        return this.subscribers
            .map(
                (sub, index) =>
                    `Subscriber#${index + 1} : event name = "${
                        sub.eventName
                    }", sender = ${sub.sender}`,
            )
            .join("\n");
    }
}
