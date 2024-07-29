import Parcel from "./Parcel";

export default abstract class Worker {
    protected _free = true;

    abstract work(parcel: Parcel): void;

    public get free() {
        return this._free;
    }
}
