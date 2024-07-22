import Character from "./Character";

export default class HawkEye extends Character {
    static power = 20;
    constructor() {
        super({ hp: 500 });
    }

    can_move({ y, x }: { y: number; x: number }): boolean {
        return false;
    }
}
