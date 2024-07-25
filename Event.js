export default class Event {
    constructor(eventName, sender, userInfo = undefined) {
        this.eventName = eventName;
        this.sender = sender;
        this.userInfo = userInfo;
    }
}
