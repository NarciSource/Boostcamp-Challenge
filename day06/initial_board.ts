import BlackWidow from "./Character.BlackWidow";
import Board from "./Board";
import CaptainAmerica from "./Character.CaptainAmerica";
import Character from "./Character";
import HawkEye from "./Character.HawkEye";
import Hulk from "./Character.Hulk";
import IronMan from "./Character.IronMan";
import Player from "./Player";
import Position from "./Position";
import Thor from "./Character.Thor";
import Ultron from "./Character.Ultron";

function team_formation(player: Player): Character[] {
    const shuffle = (list: Character[]) => list.sort(() => 0.5 - Math.random());

    const fixed_characters: Character[] = [
        new Ultron({ player }),
        new Ultron({ player }),
        new Ultron({ player }),
        new BlackWidow({ player }),
        new CaptainAmerica({ player }),
        new Thor({ player }),
    ];
    const candidate: Character[] = [
        new Hulk({ player }),
        new BlackWidow({ player }),
        new IronMan({ player }),
        new IronMan({ player }),
        new HawkEye({ player }),
        new HawkEye({ player }),
    ];

    return fixed_characters.concat(shuffle(candidate).slice(0, 4));
}

export default function initial_board(owner: Player): Board {
    const board = new Board(owner);
    const team = team_formation(owner);

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
