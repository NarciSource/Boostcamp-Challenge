import Worker from "./Worker";
import manager from "./Manager";

export default class Sorting_Worker extends Worker {
    alarm() {
        const parcel = manager.get_parcel();
        console.log("sorting start!", parcel.sorting_duration);
    }
}
