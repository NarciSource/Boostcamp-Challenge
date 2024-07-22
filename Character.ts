import Player from "./Player.js";
import Position from "./Position.js";

export default class Character {
    #position: Position;
    #hp: number;
    #power: number;
    #player: Player;

    constructor(player: Player) {
        this.#player = player;
    }

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
