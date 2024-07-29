import Parcel from "./Parcel";
import Worker from "./Worker";
import Classify_Worker from "./Classify_Worker";

class Manager {
    ready_queue: Parcel[] = [];
    logistic_queue: Parcel[] = [];
    Classify_Workers: Classify_Worker[] = [];

    constructor() {
        setInterval(this.ready_queue_watcher.bind(this), 1000);
        setInterval(this.logistic_queue_watcher.bind(this), 1000);
    }

    reception(parcels: Parcel[]): void {
        this.ready_queue = [...this.ready_queue, ...parcels];
    }

    hire(newcomers: Worker[]): void {
        const sorting_newcomers = newcomers.filter(
            (newcomer) => newcomer instanceof Classify_Worker,
        );
        this.Classify_Workers = [
            ...this.Classify_Workers,
            ...sorting_newcomers,
        ];
    }

    ready_queue_watcher() {
        if (this.ready_queue.length) {
            this.logistic_queue = [...this.logistic_queue, ...this.ready_queue];
            this.ready_queue = [];
        }
    }

    logistic_queue_watcher() {
        if (this.is_exist_unclassified_parcel) {
            this.Classify_Workers.filter((worker) => worker.free).forEach(
                (worker) => worker.alarm(),
            );
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
