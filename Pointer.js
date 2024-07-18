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

export class PCPointer extends Pointer {
    name;

    constructor(address, name) {
        super(address);
        this.func_name = name;
    }
}
