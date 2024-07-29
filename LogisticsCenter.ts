import Parcel from "./Parcel";
import Worker from "./Worker";
import ClassifyWorker from "./ClassifyWorker";
import DeliveryWorker from "./DeliveryWorker";
import EventLooper from "./EventLooper";

export default class LogisticsCenter {
    event_looper = new EventLooper<Parcel>();

    classify_workers: ClassifyWorker[] = [];
    delivery_workers: DeliveryWorker[] = [];

    constructor() {
        this.event_looper.on("active", this.allocate_worker("classify_workers"));
        this.event_looper.on("completed", this.check_status("classify_workers"));
        this.event_looper.on("active", this.allocate_worker("delivery_workers"));
        this.event_looper.on("finalize", this.check_status("delivery_workers"));
    }

    hire(newcomers: Worker[]): void {
        const classify_newcomers = newcomers.filter(
            (newcomer) => newcomer instanceof ClassifyWorker,
        );
        const delivery_newcomers = newcomers.filter(
            (newcomer) => newcomer instanceof DeliveryWorker,
        );

        this.classify_workers = [...this.classify_workers, ...classify_newcomers];
        this.delivery_workers = [...this.delivery_workers, ...delivery_newcomers];
    }

    allocate_worker(workers_name: string) {
        function inner(parcel: Parcel, callback: (data: Parcel) => void) {
            const workers = this[workers_name] as Worker[];

            const free_worker = workers.find((worker) => worker.free);

            if (free_worker) {
                if (
                    (workers_name === "classify_workers" && !parcel.classified) ||
                    (workers_name === "delivery_workers" && parcel.classified)
                ) {
                    free_worker.work(parcel);
                    callback(parcel);
                }
            }
        }
        return inner.bind(this);
    }

    check_status(workers_name: string) {
        function inner(parcel: Parcel, callback: (data: Parcel) => void) {
            if (
                (workers_name === "classify_workers" && !parcel.delivered) ||
                (workers_name === "delivery_workers" && parcel.delivered)
            ) {
                callback(parcel);
            }
        }
        return inner.bind(this);
    }

    allocate(parcels: Parcel[]): void {
        this.event_looper.enqueue(parcels);
    }

    quantity(): number {
        return this.event_looper.ready_queue.length + this.event_looper.active_queue.length;
    }
}
