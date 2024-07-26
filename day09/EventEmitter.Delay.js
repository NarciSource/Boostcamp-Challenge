import { setTimeout } from "timers/promises";
import SyncEventEmitter from "./EventEmitter.Sync.js";

export default class DelayEventEmitter extends SyncEventEmitter {
    delayMap = new Map();

    on(key, listeners, delay) {
        const key_string = JSON.stringify(key);
        this.delayMap.set(key_string, delay);

        super.on(key, listeners);
    }

    async emit(key, ...args) {
        const key_string = JSON.stringify(key);
        const handlers = this.listeners(key_string);

        for (const handler of handlers) {
            await setTimeout(this.delayMap.get(key_string));
            await handler(...args);
        }
    }
}
