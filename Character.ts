import Player from "./Player";
import Position from "./Position";

export default abstract class Character {
    #position: Position;
    #hp: number;
    #player: Player;
    static power: number;

    constructor({ hp }) {
        this.#hp = hp;
    }

    hp() {
        return this.#hp;
    }

    reduce_hp(damage: number): void {
        this.#hp = Math.max(this.#hp - damage, 0);
    }
    player() {
        return this.#player;
    }

    abstract can_move({ y, x }: { y: number; x: number }): boolean;
}
