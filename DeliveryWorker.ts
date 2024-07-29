import Worker from "./Worker";
import Parcel from "./Parcel";
import { sleep } from "./utils";

export default class DeliveryWorker extends Worker {
    async work(parcel: Parcel) {
        console.log("delivery start!");
        this.free = false;

        await sleep(10000);

        console.log("delivery end!");
        this.free = true;
        parcel.delivered = true;
    }
}
