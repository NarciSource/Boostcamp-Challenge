export default class Event {
    constructor(eventName, sender, userData = undefined) {
        this.eventName = eventName;
        this.sender = sender;
        this.userData = userData;
    }
}
