import Parcel from "./Parcel";
import Worker from "./Worker";
import Classify_Worker from "./Classify_Worker";
import Delivery_Worker from "./Delivery_Worker";
import POS from "./POS";

class Manager {
    machines: POS[] = [];
    logistic_queue: Parcel[] = [];
    delivery_queue: Parcel[] = [];
    classify_workers: Classify_Worker[] = [];
    delivery_workers: Delivery_Worker[] = [];

    constructor() {
        setInterval(this.pos_watcher.bind(this), 1000);
        setInterval(this.logistic_queue_watcher.bind(this), 1000);
        setInterval(this.delivery_queue_watcher.bind(this), 1000);
    }

    connect(pos: POS) {
        this.machines.push(pos);
    }

    hire(newcomers: Worker[]): void {
        const classify_newcomers = newcomers.filter(
            (newcomer) => newcomer instanceof Classify_Worker,
        );
        const delivery_newcomers = newcomers.filter(
            (newcomer) => newcomer instanceof Delivery_Worker,
        );

        this.classify_workers = [
            ...this.classify_workers,
            ...classify_newcomers,
        ];
        this.delivery_workers = [
            ...this.delivery_workers,
            ...delivery_newcomers,
        ];
    }

    pos_watcher() {
        const ready_queue = this.machines.flatMap((pos) => pos.transfer());

        this.logistic_queue = [...this.logistic_queue, ...ready_queue];
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

    delivery_queue_watcher() {
        if (this.delivery_queue.length) {
            const free_worker = this.delivery_workers.filter(
                (worker) => worker.free,
            );

            for (const worker of free_worker) {
                worker.alarm();
            }
        }
    }

    get_parcel(type: string): Parcel {
        const queue = {
            classify: this.logistic_queue,
            delivery: this.delivery_queue,
        }[type];

        if (queue.length) {
            const unclassified_parcel = queue[0];

            queue.shift();
            return unclassified_parcel;
        }
    }

    store_parcel(parcel: Parcel) {
        this.delivery_queue.push(parcel);
    }
}

export default new Manager();
