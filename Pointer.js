class Pointer {
    #size = 4;
    address;

    constructor(address) {
        this.address = address;
    }

    get readOnlyProps() {
        return this.#size;
    }
}

exports.Pointer = Pointer;
