export default class Event {
    constructor(eventName, sender, userInfo = undefined, completed = false) {
        this.eventName = eventName;
        this.sender = sender;
        this.userInfo = userInfo;
        this.completed = completed;
    }
}
