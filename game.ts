import BlackWidow from "./BlackWidow";
import Board from "./Board";
import CaptainAmerica from "./CaptainAmerica";
import Character from "./Character";
import HawkEye from "./HawkEye";
import Hulk from "./Hulk";
import initial_board from "./initial_board";
import IronMan from "./IronMan";
import Player from "./Player";
import Position, { Column, Row } from "./Position";
import Thor from "./Thor";
import Ultron from "./Ultron";
import { choice } from "./utils";

const turn_switch = { [Player.user]: Player.computer, [Player.computer]: Player.user };
const get_character = { UL: Ultron, BW: BlackWidow, HK: Hulk, CA: CaptainAmerica, IM: IronMan, HE: HawkEye, TH: Thor };
const get_input = (prompt: string): Promise<string> =>
    new Promise((resolve) => {
        process.stdout.write(prompt);
        process.stdin.once("data", (data) => resolve(data.toString().trim()));
    });
process.stdin.setEncoding("utf8");
const command_regex = /([\w+]{2})->(\w)(\d)/;

const main = async () => {
    const board: { [key in Player]: Board } = {
        [Player.user]: initial_board(Player.user),
        [Player.computer]: initial_board(Player.computer),
    };
    let turn = Player.user;
    console.log(board[1].board());

    while (true) {
        let nick_name: string, row: string, column: number;

        switch (turn) {
            case Player.user:
                const input = await get_input("명령을 입력하세요> ");

                if (!command_regex.test(input)) {
                    console.log("입력 형식이 틀렸습니다.");
                    continue;
                } else {
                    [, nick_name, row, column] = command_regex.exec(input) as unknown as [any, string, string, number];
                }
                break;

            case Player.computer:
                nick_name = choice(Object.keys(get_character));
                row = choice(Object.values(Row).filter((value) => typeof value !== "number"));
                column = choice(Object.values(Column).filter((value) => typeof value !== "number"));
                break;
        }

        const opponent = turn_switch[turn];
        const character_type: typeof Character = get_character[nick_name];
        const position = new Position(Row[row], Column[`0${column}`]);

        if (board[turn].has(character_type)) {
            console.log(board[opponent].attack(character_type, position));
        }
        turn = opponent;
    }
    process.stdin.pause();
};
main();
