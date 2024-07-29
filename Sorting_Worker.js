import manager from "./Manager.js";

export default class Sorting_Worker {
    alarm() {
        const parcel = manager.get_parcel();
        console.log("sorting start!", parcel.sorting_duration);
    }
}
