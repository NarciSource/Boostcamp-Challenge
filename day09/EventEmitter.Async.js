import SyncEventEmitter from "./EventEmitter.Sync.js";

export default class AsyncEventEmitter extends SyncEventEmitter {
    async emit(key, ...args) {
        const key_string = JSON.stringify(key);
        const handlers = this.listeners(key_string);

        for (const handler of handlers) {
            await handler(...args);
        }
    }
}
