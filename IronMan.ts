import Character from "./Character";

export default class IronMan extends Character {
    static power = 40;

    constructor() {
        super({ hp: 600 });
    }

    can_move({ y, x }: { y: number; x: number }): boolean {
        return Math.abs(y) === Math.abs(x);
    }
}
