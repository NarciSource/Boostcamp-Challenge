import { choice } from "./utils";
import Position, { get_keys } from "./Position";
import { Row } from "./Position.Row";
import { Column } from "./Position.Column";
import Player from "./Player";
import Character from "./Character";
import { get_character, nicknames } from "./nickname_character";
import output from "./output";
import { boards, switch_turn } from "./manager";

const attack_command_regex = /^(UL|BW|HK|CA|IM|HE|TH)->(\w)(\d)$/;
const move_command_regex = /^MOVE\s(\w)(\d)->(\w)(\d)$/;

const get_input = (prompt: string): Promise<string> =>
    new Promise((resolve) => {
        process.stdout.write(prompt);
        process.stdin.once("data", (data) => resolve(data.toString().trim()));
    });

const exit_condition = () =>
    boards[Player.user].ultron_score() === 0 ||
    boards[Player.computer].ultron_score() === 0;

function move(input: string, turn: Player) {
    const [_, from_row, from_column, to_row, to_column] =
        move_command_regex.exec(input);

    const from_position = new Position(
        Row[from_row],
        Column[`0${from_column}`],
    );
    const to_position = new Position(Row[to_row], Column[`0${to_column}`]);

    boards[turn].move(from_position, to_position);
}

async function main() {
    let turn = Player.user;

    console.log("어벤저스 보드를 초기화했습니다.");

    while (!exit_condition()) {
        console.log();

        const opponent = switch_turn(turn);
        let nick_name: string, row: string, column: number;

        switch (turn) {
            case Player.user:
                console.log(`HP = ${boards[turn].score()}`);
                output(boards[turn].display());
                console.log();

                try {
                    const input = await get_input("명령을 입력하세요> ");
                    console.clear();

                    if (input === "?") {
                        console.log(boards[opponent].question());
                        continue;
                    } else if (move_command_regex.test(input)) {
                        move(input, turn);
                        continue;
                    } else if (attack_command_regex.test(input)) {
                        [, nick_name, row, column] = attack_command_regex.exec(
                            input,
                        ) as unknown as [any, string, string, number];
                    } else {
                        throw "입력 형식이 틀렸습니다.";
                    }
                } catch (e) {
                    console.error(e);
                    continue;
                }
                break;

            case Player.computer:
                nick_name = choice(nicknames());
                row = choice(get_keys(Row));
                column = Number(choice(get_keys(Column)));

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
        } else {
            console.log("캐릭터가 존재하지 않습니다.");
        }

        turn = opponent;
    }
    console.log("게임이 종료되었습니다.");
    process.stdin.pause();
}
process.stdin.setEncoding("utf8");
main();
