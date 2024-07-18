export default class Pointer {
    #size = 4;
    address;

    constructor(address) {
        this.address = address;
    }

    get size() {
        return this.#size;
    }
}
