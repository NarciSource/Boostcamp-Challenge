import Character from "./Character";

export default class BlackWidow extends Character {
    static power = 10;

    constructor() {
        super({ hp: 400 });
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
