import SyncEventEmitter from "./EventEmitter.Sync.js";

export default class AsyncEventEmitter extends SyncEventEmitter {
    async emit(key, ...args) {
        const key_string = JSON.stringify(key);
        const matched_handlers = this.listeners(key_string);

        for (const handler of matched_handlers) {
            await handler(...args);
        }
    }
}
