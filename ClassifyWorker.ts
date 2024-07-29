import Worker from "./Worker";
import Parcel from "./Parcel";
import { sleep } from "./utils";

export default class ClassifyWorker extends Worker {
    hands = 2;
    specialist: typeof Parcel;

    async work(parcel: Parcel) {
        console.log("classified start!");
        this.hands--;

        await sleep(parcel.sorting_duration);

        console.log("classified end!");
        this.hands++;
        parcel.classified = true;
    }

    get free() {
        return this.hands > 0;
    }

    is_allowed(parcel: Parcel) {
        return !this.specialist || parcel instanceof this.specialist;
    }
}
