import Character from "./Character";
import Player from "./Player";

export default class HawkEye extends Character {
    static power = 20;

    constructor({ player }: { player: Player }) {
        super({ hp: 500, player });
    }

    can_move({ y, x }: { y: number; x: number }): boolean {
        return false;
    }
}
