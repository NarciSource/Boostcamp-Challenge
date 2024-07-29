export default class Parcel {
    sorting_duration: number;
    classified = false;
}

export class Small_Parcel extends Parcel {
    sorting_duration = 3000;
}

export class Medium_Parcel extends Parcel {
    sorting_duration = 7000;
}

export class Large_Parcel extends Parcel {
    sorting_duration = 15000;
}
