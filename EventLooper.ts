import EventEmitter from "events";

export default class EventLooper<T> extends EventEmitter {
    ready_queue: T[] = [];
    active_queue: T[] = [];
    completed_queue: T[] = [];

    constructor() {
        super();
        setInterval(this.ready_queue_loop.bind(this), 1000);
        setInterval(this.active_queue_loop.bind(this), 1000);
        setInterval(this.completed_queue_loo.bind(this), 1000);
    }

    enqueue(events: T[]) {
        this.ready_queue = [...this.ready_queue, ...events];
    }

    async ready_queue_loop() {
        for (const data of this.ready_queue) {
            const callback = (data: T) => {
                this.active_queue.push(data);
                this.ready_queue.shift();
            };

            this.emit("active", data, callback.bind(this));
        }
    }

    async active_queue_loop() {
        const callback = (data: T) => {
            this.completed_queue.push(data);
            this.active_queue.shift();
        };

        for (const data of this.active_queue) {
            this.emit("completed", data, callback.bind(this));
        }
    }

    async completed_queue_loo() {
        const callback = (data: T) => {
            this.completed_queue.shift();
        };

        for (const data of this.completed_queue) {
            this.emit("final", data, callback.bind(this));
        }
    }
}
