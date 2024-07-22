import Character from "./Character";

export default class BlackWidow extends Character {
    static power = 10;
    constructor() {
        super({ hp: 400 });
    }
}
