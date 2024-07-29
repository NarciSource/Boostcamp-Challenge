import Worker from "./Worker";
import manager from "./Manager";
import Parcel from "./Parcel";

export default class Sorting_Worker extends Worker {
    working = false;

    alarm() {
        const parcel = manager.get_parcel();

        this.work(parcel);
    }

    work(parcel: Parcel) {
        console.log("sorting start!");

        this.working = true;
        setTimeout(() => {
            console.log("sorting end!");

            this.working = false;
        }, parcel.sorting_duration);
    }
}
