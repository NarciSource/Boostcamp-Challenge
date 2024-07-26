import Character from "./Character";
import Player from "./Player";

export default class Ultron extends Character {
    static power = 40;

    constructor({ player }: { player: Player }) {
        super({ hp: 400, player });
    }

    can_move({ y, x }: { y: number; x: number }): boolean {
        return y === 0;
    }
}
