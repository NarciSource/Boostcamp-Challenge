import Character from "./Character";

export default class CaptainAmerica extends Character {
    static power = 30;
    constructor() {
        super({ hp: 700 });
    }
}
