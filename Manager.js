class Manager {
    ready_queue = [];
    delivery_queue = [];

    constructor() {
        setInterval(this.ready_queue_watcher.bind(this), 1000);
    }

    reception(parcels) {
        this.ready_queue = [...this.ready_queue, ...parcels];
    }

    async ready_queue_watcher() {
        if (this.ready_queue.length) {
            console.log("watch");
            this.ready_queue.shift();
        }
    }
}

export default new Manager();
