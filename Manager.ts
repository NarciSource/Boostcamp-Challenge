import Parcel from "./Parcel";
import Worker from "./Worker";
import Classify_Worker from "./Classify_Worker";
import Delivery_Worker from "./Delivery_Worker";
import POS from "./POS";
import EventLooper from "./EventLooper";

class Manager {
    event_looper = new EventLooper<Parcel>();
    machines: POS[] = [];
    classify_workers: Classify_Worker[] = [];
    delivery_workers: Delivery_Worker[] = [];

    constructor() {
        setInterval(this.pos_watcher.bind(this), 1000);

        this.event_looper.on("active", this.allocate_worker("classify_workers"));
        this.event_looper.on("completed", this.check_classified.bind(this));
        this.event_looper.on("finalize", this.allocate_worker("delivery_workers"));
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

        this.classify_workers = [...this.classify_workers, ...classify_newcomers];
        this.delivery_workers = [...this.delivery_workers, ...delivery_newcomers];
    }

    pos_watcher() {
        const ready_queue = this.machines.flatMap((pos) => pos.transfer());

        this.event_looper.enqueue(ready_queue);
    }

    allocate_worker(workers_name: string) {
        function inner(parcel: Parcel, callback: (data: Parcel) => void) {
            const workers = this[workers_name] as Worker[];

            const free_worker = workers.find((worker) => worker.free);
            if (free_worker) {
                free_worker.work(parcel);
                callback(parcel);
            }
        }
        return inner.bind(this);
    }

    check_classified(parcel: Parcel, callback: (data: Parcel) => void) {
        if (parcel.classified) {
            callback(parcel);
        }
    }
}

export default new Manager();
