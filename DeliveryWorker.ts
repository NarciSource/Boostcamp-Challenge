import Worker from "./Worker";
import Parcel from "./Parcel";
import { sleep } from "./utils";

export default class DeliveryWorker extends Worker {
    async work(parcel: Parcel) {
        console.log("delivery start!");
        this._free = false;

        await sleep(10000);

        console.log("delivery end!");
        this._free = true;
        parcel.delivered = true;
    }
}
