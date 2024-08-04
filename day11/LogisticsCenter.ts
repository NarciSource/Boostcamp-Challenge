import EventLooper, { LoopAction } from "./EventLooper";
import Parcel from "./Parcel";
import { parcel_dictionary } from "./Parcel.typeDictionary";
import Worker from "./Worker";
import ClassifyWorker from "./ClassifyWorker";
import DeliveryWorker from "./DeliveryWorker";

const MINIMUM_SPECIALIST_REQUIRED = 3;

export default class LogisticsCenter {
    event_looper = new EventLooper<Parcel>();

    #classify_workers: ClassifyWorker[] = [];
    #delivery_workers: DeliveryWorker[] = [];

    constructor() {
        this.event_looper.on(LoopAction.Active, this.#allocate_worker(ClassifyWorker));
        this.event_looper.on(LoopAction.Complete, this.#check_status(ClassifyWorker));
        this.event_looper.on(LoopAction.Active, this.#allocate_worker(DeliveryWorker));
        this.event_looper.on(LoopAction.Finalize, this.#check_status(DeliveryWorker));
    }

    get classify_workers(): ClassifyWorker[] {
        return this.#classify_workers;
    }
    get delivery_workers(): DeliveryWorker[] {
        return this.#delivery_workers;
    }

    hire(newcomers: Worker[]): void {
        const classify_newcomers = newcomers.filter(
            (newcomer) => newcomer instanceof ClassifyWorker,
        );
        const delivery_newcomers = newcomers.filter(
            (newcomer) => newcomer instanceof DeliveryWorker,
        );

        this.#classify_workers = [...this.classify_workers, ...classify_newcomers];
        this.#delivery_workers = [...this.delivery_workers, ...delivery_newcomers];

        if (this.classify_workers.length >= MINIMUM_SPECIALIST_REQUIRED) {
            this.#set_specialist(this.classify_workers);
        }
    }

    #set_specialist(classify_workers: ClassifyWorker[]) {
        const parcel_type_list = Object.values(parcel_dictionary);

        for (const [index, worker] of classify_workers.entries()) {
            worker.specialist = parcel_type_list[index % MINIMUM_SPECIALIST_REQUIRED];
        }
    }

    #allocate_worker(worker_type: typeof Worker) {
        function inner(parcel: Parcel, callback: (data: Parcel) => void) {
            const workers_map = new Map<typeof Worker, Worker[]>([
                [ClassifyWorker, this.classify_workers],
                [DeliveryWorker, this.delivery_workers],
            ]);

            const workers = workers_map.get(worker_type);
            const free_worker = workers.find((worker) => worker.free && worker.is_allowed(parcel));

            if (free_worker) {
                if (
                    (worker_type === ClassifyWorker && !parcel.classified) ||
                    (worker_type === DeliveryWorker && parcel.classified)
                ) {
                    free_worker.work(parcel);
                    callback(parcel);
                }
            }
        }
        return inner.bind(this);
    }

    #check_status(workers_name: typeof Worker) {
        function inner(parcel: Parcel, callback: (data: Parcel) => void) {
            if (
                (workers_name === ClassifyWorker && !parcel.delivered) ||
                (workers_name === DeliveryWorker && parcel.delivered)
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
