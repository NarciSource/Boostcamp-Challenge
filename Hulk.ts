import Character from "./Character";

export default class Hulk extends Character {
    static power = 50;
    constructor() {
        super({ hp: 700 });
    }
}
