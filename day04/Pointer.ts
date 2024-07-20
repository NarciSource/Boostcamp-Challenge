export default class Pointer {
    #size = 4;
    #address: number;

    constructor(address: number) {
        this.#address = address;
    }

    get size(): number {
        return this.#size;
    }

    get address(): number {
        return this.#address;
    }
}
