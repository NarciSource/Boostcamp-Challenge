import Character from "./Character";
import Player from "./Player";

export default class Thor extends Character {
    static power = 50;

    constructor({ player }: { player: Player }) {
        super({ hp: 900, player });
    }

    can_move({ y, x }: { y: number; x: number }): boolean {
        return y === 0 || x === 0 || Math.abs(y) === Math.abs(x);
    }
}
