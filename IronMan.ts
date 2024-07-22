import Character from "./Character";

export default class IronMan extends Character {
    static power = 40;
    constructor() {
        super({ hp: 600 });
    }
}
