import EventEmitter from "events";

export default class SyncEventEmitter extends EventEmitter {
    keyMap = new Map();

    on(key, listener) {
        const key_string = JSON.stringify(key);
        if (!this.keyMap.has(key_string)) {
            this.keyMap.set(key_string, key);
        }
        super.on(key_string, listener);
    }

    async emit(key, ...args) {
        const key_string = JSON.stringify(key);
        super.emit(key_string, ...args);
    }

    getKeys() {
        return Array.from(this.keyMap.values());
    }
}
