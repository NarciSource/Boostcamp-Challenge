import { Worker } from "worker_threads";

export default class Publisher {
    name;
    worker = new Worker("./worker.js");

    constructor(name) {
        this.name = name;

        this.worker.postMessage({ command: "init", data: name });
    }
}
