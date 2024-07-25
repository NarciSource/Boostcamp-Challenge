import Event from "./event";

class EventManager {
    subscriber = [];


    constructor() {
        if (EventManager.instance) {
            return EventManager.instance;
        }
        
        this.subscriber = [];
        Event.instance = this;
    }

    static instance;
    static sharedInstance() {
        if (!EventManager.instance) {
            EventManager.instance = new EventManager();
        }
        return EventManager.instance;
    }
}

