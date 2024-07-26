import Character from "./Character";
import Player from "./Player";

export default class IronMan extends Character {
    static power = 40;

    constructor({ player }: { player: Player }) {
        super({ hp: 600, player });
    }

    can_move({ y, x }: { y: number; x: number }): boolean {
        return Math.abs(y) === Math.abs(x);
    }
}
