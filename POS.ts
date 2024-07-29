import Manager from "./Manager";
import Parcel, { LargeParcel, MediumParcel, SmallParcel } from "./Parcel";
import { v4 as uuidv4 } from "uuid";

export default class POS {
    regex = /^(1|2|3):(\d)$/;
    ready_queue: Parcel[] = [];

    constructor() {
        Manager.connect(this);
    }

    input(input: string): string {
        switch (input) {
            case "":
                return;
            case "exit":
                return "exit";
            default:
                const [, type, num] = this.regex.exec(input);
                const Parcel_Type = {
                    1: SmallParcel,
                    2: MediumParcel,
                    3: LargeParcel,
                }[type];

                const customer_id = uuidv4().substring(0, 4);
                const parcels = new Array(parseInt(num))
                    .fill(null)
                    .map(() => new Parcel_Type(customer_id));

                this.ready_queue = [...this.ready_queue, ...parcels];
        }
    }

    transfer(): Parcel[] {
        const ready_queue = this.ready_queue;
        this.ready_queue = [];
        return ready_queue;
    }
}
