export default class Parcel {
    sorting_duration: number;
}

export class Small_Parcel extends Parcel {
    sorting_duration = 3;
}

export class Medium_Parcel extends Parcel {
    sorting_duration = 7;
}

export class Large_Parcel extends Parcel {
    sorting_duration = 15;
}
