export default class Parcel {
    customer: string;
    sorting_duration: number;
    classified = false;
    delivered = false;

    constructor(customer: string) {
        this.customer = customer;
    }
}

export class SmallParcel extends Parcel {
    sorting_duration = 3000;
}

export class MediumParcel extends Parcel {
    sorting_duration = 7000;
}

export class LargeParcel extends Parcel {
    sorting_duration = 15000;
}
