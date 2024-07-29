import manager from "./Manager";

class DashBoard {
    display() {
        setInterval(() => {
            for (const center of manager.logistics_centers) {
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
        }, 3000);
    }
}

export default new DashBoard();
