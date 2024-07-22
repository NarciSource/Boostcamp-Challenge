import { choice } from "./utils";
import Position, { Column, Row } from "./Position";
import Player from "./Player";
import Board from "./Board";
import initial_board from "./initial_board";
import Character from "./Character";
import { get_character, nicknames } from "./nickname_character";
import output from "./output";

const turn_switch = {
    [Player.user]: Player.computer,
    [Player.computer]: Player.user,
};

const get_input = (prompt: string): Promise<string> =>
    new Promise((resolve) => {
        process.stdout.write(prompt);
        process.stdin.once("data", (data) => resolve(data.toString().trim()));
    });
process.stdin.setEncoding("utf8");
const command_regex = /(UL|BW|HK|CA|IM|HE|TH)->(\w)(\d)/;
const move_regex = /(\w)(\d)->(\w)(\d)/;

const main = async () => {
    const boards: { [key in Player]: Board } = {
        [Player.user]: initial_board(Player.user),
        [Player.computer]: initial_board(Player.computer),
    };
    let turn = Player.user;

    console.log("어벤저스 보드를 초기화했습니다.");

    while (true) {
        const opponent = turn_switch[turn];
        let nick_name: string, row: string, column: number;

        if (
            boards[turn].ultron_score() === 0 ||
            boards[opponent].ultron_score() === 0
        ) {
            break;
        }
        console.log();

        try {
            switch (turn) {
                case Player.user:
                    console.log(`HP = ${boards[turn].score()}`);
                    output(boards[opponent].display());
                    console.log();

                    const input = await get_input("명령을 입력하세요> ");

                    if (input === "?") {
                        console.log(boards[opponent].question());
                        continue;
                    }
                    if (input === "move") {
                        const input_second = await get_input("움직이세요> ");

                        if (!move_regex.test(input_second)) {
                            console.log("입력 형식이 틀렸습니다.");
                        } else {
                            const [
                                _,
                                from_row,
                                from_column,
                                to_row,
                                to_column,
                            ] = move_regex.exec(input_second);

                            const from_position = new Position(
                                Row[from_row],
                                Column[`0${from_column}`],
                            );
                            const to_position = new Position(
                                Row[to_row],
                                Column[`0${to_column}`],
                            );

                            boards[turn].move(from_position, to_position);
                        }
                        continue;
                    }

                    if (!command_regex.test(input)) {
                        console.log("입력 형식이 틀렸습니다.");
                        continue;
                    } else {
                        [, nick_name, row, column] = command_regex.exec(
                            input,
                        ) as unknown as [any, string, string, number];
                    }
                    break;

                case Player.computer:
                    nick_name = choice(nicknames());
                    row = choice(
                        Object.values(Row).filter(
                            (value) => typeof value !== "number",
                        ),
                    );
                    column = Number(
                        choice(
                            Object.values(Column).filter(
                                (value) => typeof value !== "number",
                            ),
                        ),
                    );

                    console.log(
                        "컴퓨터가 입력합니다>",
                        `${nick_name}->${row}${column}`,
                    );
                    break;
            }

            const position = new Position(Row[row], Column[`0${column}`]);
            const character_type: typeof Character = get_character(nick_name);

            if (boards[turn].has(character_type)) {
                console.log(boards[opponent].attack(character_type, position));
            }

            turn = opponent;
        } catch (e) {
            console.error(e);
        }
    }
    process.stdin.pause();
};
main();
