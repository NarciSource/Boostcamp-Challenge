export default class Scalar {
    #size = 4;
    #address: number;
    #value: string;

    constructor(address: number, value: string) {
        this.#address = address;
        this.#value = value;
    }

    get size(): number {
        return this.#size;
    }
    get address(): number {
        return this.#address;
    }
    get value(): string {
        return this.#value;
    }
}
