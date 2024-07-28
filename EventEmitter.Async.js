import SyncEventEmitter from "./EventEmitter.Sync.js";

export default class AsyncEventEmitter extends SyncEventEmitter {
    async emit(key, ...args) {
        const matched_handlers = this.listeners(key);

        for (const handler of matched_handlers) {
            await handler(...args);
        }
    }
}
