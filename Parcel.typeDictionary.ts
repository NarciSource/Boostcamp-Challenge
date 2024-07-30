import Parcel, { LargeParcel, MediumParcel, SmallParcel } from "./Parcel";

const parcel_dictionary = {
    1: SmallParcel,
    2: MediumParcel,
    3: LargeParcel,
};

export const get_parcel_type = (type: number): typeof Parcel => parcel_dictionary[type];
