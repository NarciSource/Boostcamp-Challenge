import Character from "./Character";
import Player from "./Player";

export default class CaptainAmerica extends Character {
    static power = 30;

    constructor({ player }: { player: Player }) {
        super({ hp: 700, player });
    }

    can_move({ y, x }: { y: number; x: number }): boolean {
        return x === 0 || y === 0;
    }
}
