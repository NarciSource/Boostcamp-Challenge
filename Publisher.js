import EventManager from "./EventManager.js";

const eventManager = EventManager.sharedInstance();

export default class Publisher {
    name;

    constructor(name) {
        this.name = name;
    }

    on(eventName, args) {
        eventManager.add({ ...args, eventName, publisher: this });
    }

    trigger(eventName, userInfo, completed = false) {
        eventManager.postEvent({
            eventName,
            publisher: this,
            completed,
            userInfo,
        });
    }
}
