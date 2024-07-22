import Character from "./Character";
import Player from "./Player";
import Position from "./Position";

const ROW_SIZE = 5;
const COLUMN_SIZE = 6;

export default class Board {
    #board: (Character | null)[][] = Array(ROW_SIZE)
        .fill(null)
        .map(() => Array(COLUMN_SIZE).fill(null));

    #owner: Player;

    #characters = {
        player: {},
        opponent: {},
    };

    // please remove this
    board() {
        return this.#board;
    }

    score() {
        const value_sum = this.#board.reduce((acc, columns) => acc + columns.filter((i) => i).reduce((acc, cur) => acc + cur.hp(), 0), 0);
        return value_sum;
    }

    set(position: Position, character: Character) {
        const { column, row } = position;

        this.#is_valid(position);

        if (this.#board[row][column]) {
            throw "해당 위치에 다른 말이 있습니다.";
        }

        this.#board[row][column] = character;
    }

    attack(character: string, position: Position) {
        const { column, row } = position;
        this.#is_valid(position);

        if (this.#characters.opponent[character]) {
            const target = this.#board[row][column];
            if (target.player() === this.#owner) {
                const damage = 0; // temporally
                target.reduce_hp(damage);
                return target.hp();
            }
        }
        return 0;
    }

    display(line_num) {
        return this.#board[line_num];
    }

    #is_valid(position: Position) {
        const { column, row } = position;

        if (row < 0 || column < 0 || row >= ROW_SIZE || column >= COLUMN_SIZE) {
            throw "보드 범위를 벗어나 있습니다.";
        }
    }
}
