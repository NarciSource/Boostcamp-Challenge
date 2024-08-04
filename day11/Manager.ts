import POS from "./POS";
import LogisticsCenter from "./LogisticsCenter";

const LOGISTICS_CENTERS = 4;

class Manager {
    machines: POS[] = [];
    logistics_centers = Array(LOGISTICS_CENTERS)
        .fill(null)
        .map(() => new LogisticsCenter());

    constructor() {
        setInterval(this.pos_watcher.bind(this), 1000);
    }

    connect(pos: POS) {
        this.machines.push(pos);
    }

    pos_watcher() {
        const parcels = this.machines.flatMap((pos) => pos.transfer());

        const selected_center = this.logistics_centers.reduce((pre, cur) =>
            pre.quantity() > cur.quantity() ? cur : pre,
        );

        selected_center.allocate(parcels);
    }
}

export default new Manager();
