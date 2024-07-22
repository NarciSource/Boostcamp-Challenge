import Character from "./Character";

export default class Thor extends Character {
    static power = 50;
    constructor() {
        super({ hp: 900 });
    }

    can_move({ y, x }: { y: number; x: number }): boolean {
        return y === 0 || x === 0 || Math.abs(y) === Math.abs(x);
    }
}
