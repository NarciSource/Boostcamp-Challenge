import Worker from "./Worker";
import manager from "./Manager";
import Parcel from "./Parcel";

export default class Delivery_Worker extends Worker {
    alarm(): void {
        const parcel = manager.get_parcel("delivery");

        if (parcel) {
            this.work(parcel);
        }
    }

    work(parcel: Parcel) {
        console.log("delivery start!");

        this.free = false;
        setTimeout(() => {
            console.log("delivery end!");

            this.free = true;
        }, 10000);
    }
}
