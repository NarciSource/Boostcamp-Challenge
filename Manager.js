class Manager {
    ready_queue = [];
    delivery_queue = [];

    reception(parcels) {
        this.ready_queue.concat(parcels);
    }
}

export default new Manager();
