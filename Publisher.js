import { Worker } from "worker_threads";

export default class Publisher {
    name;
    worker = new Worker("./worker.js");

    constructor(name) {
        this.name = name;

        this.worker.postMessage({ command: "init", args: { name } });
    }

    on(eventName, args) {
        this.worker.postMessage({
            command: "addEvent",
            args: { ...args, eventName, handler: args.handler?.toString() },
        });
    }

    trigger(eventName, userInfo) {
        this.worker.postMessage({
            command: "triggerEvent",
            args: { eventName, userInfo },
        });
    }

    destroy() {
        this.worker.terminate();
    }
}
