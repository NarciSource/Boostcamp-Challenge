import initial_board from "./initial_board";
import Player from "./Player";

const computer_board = initial_board(Player.computer);
const user_board = initial_board(Player.user);

console.log(computer_board.board());
console.log(user_board.board());

const main = async () => {
    const turn_switch = { [Player.user]: Player.computer, [Player.computer]: Player.user };
    const get_input = (prompt: string) =>
        new Promise((resolve) => {
            process.stdout.write(prompt);
            process.stdin.once("data", (data) => resolve(data.toString().trim()));
        });

    try {
        process.stdin.setEncoding("utf8");
        let turn = Player.user;

        while (true) {
            if (turn === Player.user) {
                const input = await get_input("명령을 입력하세요> ");

            }
            turn = turn_switch[turn];
        }
    } finally {
        process.stdin.pause();
    }
};
main();
