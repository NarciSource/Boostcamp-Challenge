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
        console.log("classified start!");

        this.free = false;
        setTimeout(() => {
            console.log("classified end!");

            parcel.classified = true;
            manager.store_parcel(parcel);
            this.free = true;
        }, parcel.sorting_duration);
    }
}
