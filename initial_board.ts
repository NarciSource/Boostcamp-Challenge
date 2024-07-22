import BlackWidow from "./BlackWidow";
import Board from "./Board";
import CaptainAmerica from "./CaptainAmerica";
import Character from "./Character";
import HawkEye from "./HawkEye";
import Hulk from "./Hulk";
import IronMan from "./IronMan";
import Player from "./Player";
import Position from "./Position";
import Thor from "./Thor";
import Ultron from "./Ultron";

function team_formation(): Character[] {
    const shuffle = (list: Character[]) => list.sort(() => 0.5 - Math.random());

    const fixed_characters: Character[] = [
        new Ultron(),
        new Ultron(),
        new Ultron(),
        new BlackWidow(),
        new CaptainAmerica(),
        new Thor(),
    ];
    const candidate: Character[] = [
        new Hulk(),
        new BlackWidow(),
        new IronMan(),
        new IronMan(),
        new HawkEye(),
        new HawkEye(),
    ];

    return fixed_characters.concat(shuffle(candidate).slice(0, 4));
}

export default function initial_board(owner: Player): Board {
    const board = new Board(owner);
    const team = team_formation();

    for (const character of team) {
        while (true) {
            try {
                const position = Position.random();
                board.set_piece_init(position, character);
                break;
            } catch (e) {
                // console.debug(e);
            }
        }
    }

    return board;
}
