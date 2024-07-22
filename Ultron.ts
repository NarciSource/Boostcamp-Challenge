import Character from "./Character";

export default class Ultron extends Character {
    static power = 40;

    constructor() {
        super({ hp: 400 });
    }

    can_move({ y, x }: { y: number; x: number }): boolean {
        return y === 0;
    }
}
