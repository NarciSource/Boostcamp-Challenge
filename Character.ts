import Player from "./Player";
import Position from "./Position";

export default class Character {
    #position: Position;
    #hp: number;
    #power: number;
    #player: Player;

    hp() {
        return this.#hp;
    }
    reduce_hp(damage: number) {
        if (damage > 0) {
            this.#hp -= damage;
        }
    }
    player() {
        return this.#player;
    }
}
