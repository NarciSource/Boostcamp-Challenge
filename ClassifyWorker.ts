import Worker from "./Worker";
import Parcel from "./Parcel";
import { sleep } from "./utils";

export default class ClassifyWorker extends Worker {
    async work(parcel: Parcel) {
        console.log("classified start!");
        this.free = false;

        await sleep(parcel.sorting_duration);

        console.log("classified end!");
        this.free = true;
        parcel.classified = true;
    }
}
