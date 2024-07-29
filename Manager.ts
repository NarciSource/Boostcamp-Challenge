import Parcel from "./Parcel";
import Worker from "./Worker";
import Classify_Worker from "./Classify_Worker";

class Manager {
    ready_queue: Parcel[] = [];
    logistic_queue: Parcel[] = [];
    delivery_queue: Parcel[] = [];
    classify_workers: Classify_Worker[] = [];

    constructor() {
        setInterval(this.ready_queue_watcher.bind(this), 1000);
        setInterval(this.logistic_queue_watcher.bind(this), 1000);
    }

    reception(parcels: Parcel[]): void {
        this.ready_queue = [...this.ready_queue, ...parcels];
    }

    hire(newcomers: Worker[]): void {
        const classify_newcomers = newcomers.filter(
            (newcomer) => newcomer instanceof Classify_Worker,
        );
        this.classify_workers = [
            ...this.classify_workers,
            ...classify_newcomers,
        ];
    }

    ready_queue_watcher() {
        if (this.ready_queue.length) {
            this.logistic_queue = [...this.logistic_queue, ...this.ready_queue];
            this.ready_queue = [];
        }
    }

    logistic_queue_watcher() {
        if (this.logistic_queue.length) {
            const free_worker = this.classify_workers.filter(
                (worker) => worker.free,
            );

            for (const worker of free_worker) {
                worker.alarm();
            }
        }
    }

    get_parcel(): Parcel {
        if (this.logistic_queue.length) {
            const unclassified_parcel = this.logistic_queue[0];

            this.logistic_queue.shift();
            return unclassified_parcel;
        }
    }

    store_parcel(parcel: Parcel) {
        this.delivery_queue.push(parcel);
    }
}

export default new Manager();
