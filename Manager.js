import Sorting_Worker from "./Sorting_Worker.js";

class Manager {
    ready_queue = [];
    logistic_queue = [];

    constructor() {
        setInterval(this.ready_queue_watcher.bind(this), 1000);
    }

    reception(parcels) {
        this.ready_queue = [...this.ready_queue, ...parcels];
    }

    hire(newcomers) {
        const sorting_newcomers = newcomers.filter(
            (newcomer) => newcomer instanceof Sorting_Worker,
        );
        this.sorting_workers = [...this.sorting_workers, ...sorting_newcomers];

        console.log(this.sorting_workers);
    }

    async ready_queue_watcher() {
        if (this.ready_queue.length) {
            this.logistic_queue = [...this.logistic_queue, ...this.ready_queue];
            this.ready_queue = [];
        }
    }
}

export default new Manager();
