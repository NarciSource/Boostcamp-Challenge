import Worker from "./Worker";
import manager from "./Manager";
import Parcel from "./Parcel";

export default class Classify_Worker extends Worker {
    free = true;

    alarm() {
        const parcel = manager.get_parcel();

        this.work(parcel);
    }

    work(parcel: Parcel) {
        console.log("sorting start!");

        this.free = false;
        setTimeout(() => {
            console.log("sorting end!");

            this.free = true;
        }, parcel.sorting_duration);
    }
}
