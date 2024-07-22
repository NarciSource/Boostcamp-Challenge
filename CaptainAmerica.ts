import Character from "./Character";

export default class CaptainAmerica extends Character {
    static power = 30;
    constructor() {
        super({ hp: 700 });
    }

    can_move({ y, x }: { y: number; x: number }): boolean {
        return x === 0 || y === 0;
    }
}
