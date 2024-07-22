import Character from "./Character";
import BlackWidow from "./BlackWidow";
import CaptainAmerica from "./CaptainAmerica";
import HawkEye from "./HawkEye";
import Hulk from "./Hulk";
import IronMan from "./IronMan";
import Thor from "./Thor";
import Ultron from "./Ultron";

const character_dictionary: { [key: string]: typeof Character } = {
    UL: Ultron,
    BW: BlackWidow,
    HK: Hulk,
    CA: CaptainAmerica,
    IM: IronMan,
    HE: HawkEye,
    TH: Thor,
};

function invert(object: {
    [key: string]: typeof Character;
}): Map<typeof Character, string> {
    const inverted = new Map();
    for (const [key, value] of Object.entries(object)) {
        inverted.set(value, key);
    }
    return inverted;
}

export const nicknames = (): string[] => Object.keys(character_dictionary);
export const characters = (): (typeof Character)[] =>
    Object.values(character_dictionary);

export const get_character = (nickname: string): typeof Character =>
    character_dictionary[nickname];

export const get_nickname = (character: Character): string =>
    invert(character_dictionary).get(character.constructor as typeof Character);
