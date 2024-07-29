import Worker from "./Worker";
import Parcel from "./Parcel";
import { sleep } from "./utils";

export default class ClassifyWorker extends Worker {
    hands = 2;
    specialist: typeof Parcel;

    async work(parcel: Parcel) {
        console.log(parcel.customer, parcel.constructor.name, "분류중");
        this.hands--;

        await sleep(parcel.sorting_duration);

        console.log(parcel.customer, parcel.constructor.name, "분류완료");
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
