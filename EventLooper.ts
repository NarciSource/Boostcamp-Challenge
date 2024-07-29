import EventEmitter from "events";

export default class EventLooper<T> extends EventEmitter {
    ready_queue: T[] = [];
    active_queue: T[] = [];
    completed_queue: T[] = [];

    constructor() {
        super();
        setInterval(this.ready_queue_loop.bind(this), 1000);
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
}
