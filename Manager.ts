import Parcel from "./Parcel";
import Worker from "./Worker";
import Sorting_Worker from "./Sorting_Worker";

class Manager {
    ready_queue: Parcel[] = [];
    logistic_queue: Parcel[] = [];
    sorting_workers: Sorting_Worker[] = [];

    constructor() {
        setInterval(this.ready_queue_watcher.bind(this), 1000);
        setInterval(this.logistic_queue_watcher.bind(this), 1000);
    }

    reception(parcels: Parcel[]): void {
        this.ready_queue = [...this.ready_queue, ...parcels];
    }

    hire(newcomers: Worker[]): void {
        const sorting_newcomers = newcomers.filter(
            (newcomer) => newcomer instanceof Sorting_Worker,
        );
        this.sorting_workers = [...this.sorting_workers, ...sorting_newcomers];
    }

    async ready_queue_watcher() {
        if (this.ready_queue.length) {
            this.logistic_queue = [...this.logistic_queue, ...this.ready_queue];
            this.ready_queue = [];
        }
    }

    async logistic_queue_watcher() {
        if (this.is_exist_unclassified_parcel) {
            for (const worker of this.sorting_workers) {
                worker.alarm();
            }
        }
    }

    get_parcel(): Parcel {
        if (this.is_exist_unclassified_parcel) {
            const unclassified_parcel = this.logistic_queue[0];

            this.logistic_queue.shift();
            return unclassified_parcel;
        }
    }

    get is_exist_unclassified_parcel(): boolean {
        return this.logistic_queue.length > 0;
    }
}

export default new Manager();
