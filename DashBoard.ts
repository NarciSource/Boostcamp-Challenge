import LogisticsCenter from "./LogisticsCenter";
import manager from "./Manager";

const MONITORING_TIME = 3000;

class DashBoard {
    read_queue(center: LogisticsCenter) {
        const ready = center.event_looper.ready_queue
            .filter((parcel) => !parcel.classified)
            .map((each) => each.constructor.name);
        const classifying = center.event_looper.active_queue
            .filter((parcel) => !parcel.classified)
            .map((each) => each.constructor.name);
        const delivery_ready = center.event_looper.ready_queue
            .filter((parcel) => parcel.classified)
            .map((each) => each.constructor.name);
        const delivering = center.event_looper.active_queue
            .filter((parcel) => parcel.classified)
            .map((each) => each.constructor.name);
        const delivered = center.event_looper.completed_queue
            .filter((parcel) => parcel.delivered)
            .map((each) => each.constructor.name);

        return { ready, classifying, delivery_ready, delivering, delivered };
    }

    async monitor() {
        let past_is_remains = true;
        setInterval(() => {
            let is_remains = false;
            for (const center of manager.logistics_centers) {
                const { ready, classifying, delivery_ready, delivering, delivered } =
                    this.read_queue(center);

                is_remains ||= !!(
                    ready.length +
                    classifying.length +
                    delivery_ready.length +
                    delivering.length
                );
            }
            if (!is_remains && !past_is_remains) {
                process.exit(0);
            } else {
                past_is_remains = is_remains;
            }
        }, MONITORING_TIME);
    }

    display() {
        setInterval(() => {
            for (const center of manager.logistics_centers) {
                const { ready, classifying, delivery_ready, delivering, delivered } =
                    this.read_queue(center);

                if (ready.length) {
                    console.log("대기중", ready);
                }
                if (classifying.length) {
                    console.log("분류중", classifying);
                }
                if (delivery_ready.length) {
                    console.log("배송대기", delivery_ready);
                }
                if (delivering.length) {
                    console.log("배송중", delivering);
                }
                if (delivered.length) {
                    console.log("배송완료", delivered);
                }
            }
        }, MONITORING_TIME);
    }
}

export default new DashBoard();
