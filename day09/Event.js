import { sleep } from "./utils.js";

export default class Event {
    constructor(eventName, publisher, completed = false) {
        this.eventName = eventName;
        this.publisher = publisher;
        this.completed = completed;
    }

    run(userData) {
        sleep(2000);
        this.completed = true;

        return `${this.eventName} event from ${
            this.publisher.name
        } userData = ${JSON.stringify(userData)}`;
    }
}
