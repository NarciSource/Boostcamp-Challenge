import Worker from "./Worker";
import Parcel from "./Parcel";
import { sleep } from "./utils";

const DELIVERY_TIME = 10000;

export default class DeliveryWorker extends Worker {
    async work(parcel: Parcel) {
        console.log(parcel.customer, parcel.constructor.name, "배달 시작");
        this._free = false;

        await sleep(DELIVERY_TIME);

        console.log(parcel.customer, parcel.constructor.name, "배달 완료");
        this._free = true;

        parcel.delivered = true;
    }
}
