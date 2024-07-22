import Character from "./Character";

export default class Thor extends Character {
    static power = 50;
    constructor() {
        super({ hp: 900 });
    }
}
