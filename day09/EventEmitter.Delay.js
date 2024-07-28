import { setTimeout } from "timers/promises";
import AsyncEventEmitter from "./EventEmitter.Async.js";

export default class DelayEventEmitter extends AsyncEventEmitter {
    on(key, listener, delay) {
        const delayed_listener = async (...args) => {
            await setTimeout(delay);
            await listener(...args);
        };

        super.on(key, delayed_listener);
    }
}
