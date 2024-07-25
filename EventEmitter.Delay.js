import EventEmitter from "events";
import { setTimeout } from "timers/promises";

export default class DelayEventEmitter extends EventEmitter {
    delay;

    on(key, listeners, delay) {
        this.delay = delay;
        super.on(key, listeners);
    }

    async emit(key, ...args) {
        const handlers = this.listeners(key);

        for (const handler of handlers) {
            await setTimeout(this.delay);
            await handler(...args);
        }
    }
}
