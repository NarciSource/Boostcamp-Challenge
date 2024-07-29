import Parcel from "./Parcel";

export default abstract class Worker {
    free = true;

    abstract work(parcel: Parcel): void;
}
