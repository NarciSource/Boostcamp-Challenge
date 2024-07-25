export default class Subscriber {
    name;
    handler;
    constructor(name, handler) {
        this.name = name;
        this.handler = handler;
    }
}
