import Position from "./Position.js";

export default class Character {
    #position: Position;
    #hp: number;

    hp() {
        return this.#hp
    }
}
