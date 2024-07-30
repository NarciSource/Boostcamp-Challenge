const DELIVERY_TIME = {
    SMALL_PARCEL: 3000,
    MEDIUM_PARCEL: 7000,
    LARGE_PARCEL: 15000,
};

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
    sorting_duration = DELIVERY_TIME.SMALL_PARCEL;
}

export class MediumParcel extends Parcel {
    sorting_duration = DELIVERY_TIME.MEDIUM_PARCEL;
}

export class LargeParcel extends Parcel {
    sorting_duration = DELIVERY_TIME.LARGE_PARCEL;
}
