import Character from "./Character";

export default class Hulk extends Character {
    static power = 50;
    constructor() {
        super({ hp: 700 });
    }

    can_move({ y, x }: { y: number; x: number }): boolean {
        return x === 0;
    }
}
