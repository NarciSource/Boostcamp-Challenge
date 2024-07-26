import Character from "./Character";
import Player from "./Player";

export default class BlackWidow extends Character {
    static power = 10;

    constructor({ player }: { player: Player }) {
        super({ hp: 400, player });
    }

    can_move({ y, x }: { y: number; x: number }): boolean {
        const capacity = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
        ];

        return capacity.some(([yy, xx]) => y === yy && x === xx);
    }
}
