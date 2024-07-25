import EventEmitter from "events";

export default class AsyncEventEmitter extends EventEmitter {
    async emit(key, ...args) {
        const handlers = this.listeners(key);
        for (const handler of handlers) {
            await handler(...args);
        }
    }
}
