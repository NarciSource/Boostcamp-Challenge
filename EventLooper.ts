import EventEmitter from "events";

type queue<T> = T[];

export default class EventLooper<T> extends EventEmitter {
    ready_queue: queue<T> = [];
    active_queue: queue<T> = [];
    completed_queue: queue<T> = [];

    constructor() {
        super();

        setInterval(() => {
            this.move_to_queue("active", this.ready_queue, this.active_queue);
            this.move_to_queue("completed", this.active_queue, this.ready_queue);
            this.move_to_queue("finalize", this.active_queue, this.completed_queue);
        }, 1000);
    }

    enqueue(events: T[]): void {
        this.ready_queue = [...this.ready_queue, ...events];
    }

    move_to_queue(key: string, source_queue: T[], destination_queue: T[]): void {
        const callback = (event: T) => {
            destination_queue?.push(event);
            source_queue.shift();
        };

        for (const event of source_queue) {
            this.emit(key, event, callback.bind(this));
        }
    }
}
