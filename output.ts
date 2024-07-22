import BlackWidow from "./BlackWidow";
import CaptainAmerica from "./CaptainAmerica";
import Character from "./Character";
import HawkEye from "./HawkEye";
import Hulk from "./Hulk";
import IronMan from "./IronMan";
import { Row } from "./Position";
import Thor from "./Thor";
import Ultron from "./Ultron";

const get_character = { UL: Ultron, BW: BlackWidow, HK: Hulk, CA: CaptainAmerica, IM: IronMan, HE: HawkEye, TH: Thor };
const get_nickname = invert(get_character);

function invert(object: { [key: string]: typeof Character }): Map<typeof Character, string> {
    const inverted = new Map();
    for (const [key, value] of Object.entries(object)) {
        inverted.set(value, key);
    }
    return inverted;
}

export default function output(characters: Character[][]) {
    console.log(` |01|02|03|04|05|06|`);
    for (const [index, columns] of characters.entries()) {
        const nick_name_columns = columns.map((column) => (column ? get_nickname.get(column.constructor as typeof Character) : ".."));

        console.log(`${Row[index]}|${nick_name_columns.join("|")}|`);
    }
    console.log(` |01|02|03|04|05|06|`);
}
