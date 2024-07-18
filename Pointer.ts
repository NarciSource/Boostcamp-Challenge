export default class Pointer {
    #size = 4;
    address: number;

    constructor(address: number) {
        this.address = address;
    }

    get size(): number {
        return this.#size;
    }
}

export class ReturnPointer extends Pointer {
    value: string;

    constructor(address: number, value: string) {
        super(address);
        this.value = value;
    }
}
