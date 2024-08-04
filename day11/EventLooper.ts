import EventEmitter from "events";

const LOOP_TIME = 1000;
type queue<T> = T[];

export enum LoopAction {
    Active = "Active",
    Complete = "Complete",
    Finalize = "Finalize",
}

export default class EventLooper<Event> extends EventEmitter {
    ready_queue: queue<Event> = [];
    active_queue: queue<Event> = [];
    completed_queue: queue<Event> = [];

    constructor() {
        super();

        setInterval(() => {
            this.swap(LoopAction.Active, this.ready_queue, this.active_queue);
            this.swap(LoopAction.Complete, this.active_queue, this.ready_queue);
            this.swap(LoopAction.Finalize, this.active_queue, this.completed_queue);
        }, LOOP_TIME);
    }

    enqueue(events: Event[]): void {
        this.ready_queue = [...this.ready_queue, ...events];
    }

    swap(action: LoopAction, source_queue: queue<Event>, destination_queue: queue<Event>): void {
        const callback = (event: Event) => {
            destination_queue?.push(event);
            source_queue.shift();
        };

        for (const event of source_queue) {
            this.emit(action, event, callback.bind(this));
        }
    }
}
