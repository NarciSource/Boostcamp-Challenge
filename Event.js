export default class Event {
    constructor(eventName, publisher, userInfo = undefined, completed = false) {
        this.eventName = eventName;
        this.publisher = publisher;
        this.userInfo = userInfo;
        this.completed = completed;
    }

    run(userData) {
        return `${this.eventName} event from ${
            this.publisher.name
        } userData = ${JSON.stringify(userData)}`;
    }
}
