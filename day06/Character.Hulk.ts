import Character from "./Character";
import Player from "./Player";

export default class Hulk extends Character {
    static power = 50;

    constructor({ player }: { player: Player }) {
        super({ hp: 700, player });
    }

    can_move({ y, x }: { y: number; x: number }): boolean {
        return x === 0;
    }
}
