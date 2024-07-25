import { setTimeout } from "timers/promises";
import SyncEventEmitter from "./EventEmitter.Sync.js";

export default class DelayEventEmitter extends SyncEventEmitter {
    delay;

    on(key, listeners, delay) {
        this.delay = delay;
        super.on(key, listeners);
    }

    async emit(key, ...args) {
        const key_string = JSON.stringify(key);
        const handlers = this.listeners(key_string);

        for (const handler of handlers) {
            await setTimeout(this.delay);
            await handler(...args);
        }
    }
}
