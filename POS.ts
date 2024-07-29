import manager from "./Manager";
import { Large_Parcel, Medium_Parcel, Small_Parcel } from "./Parcel";

export default class POS {
    regex = /^(1|2|3):(\d)$/;

    input(input: string): string {
        switch (input) {
            case "":
                return;
            case "exit":
                return "exit";
            default:
                const [, type, num] = this.regex.exec(input);
                const Parcel_Type = {
                    1: Small_Parcel,
                    2: Medium_Parcel,
                    3: Large_Parcel,
                }[type];

                const parcels = new Array(parseInt(num)).fill(
                    new Parcel_Type(),
                );

                manager.reception(parcels);
        }
    }
}
