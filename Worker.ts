import Parcel from "./Parcel";

export default abstract class Worker {
    free = true;

    abstract alarm(): void;
    abstract work(parcel: Parcel): void;
}
