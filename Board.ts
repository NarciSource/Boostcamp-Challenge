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

    constructor(owner: Player) {
        this.#owner = owner;
    }

    // please remove this
    board() {
        return this.#board;
    }

    score() {
        const value_sum = this.#board.reduce((acc, columns) => acc + columns.filter((i) => i).reduce((acc, cur) => acc + cur.hp(), 0), 0);
        return value_sum;
    }

    set_piece_init(position: Position, character: Character) {
        const { column, row } = position;

        if (this.#board[row][column]) {
            throw "해당 위치에 다른 말이 있습니다.";
        }

        this.#board[row][column] = character;
    }

    attack(character: string, position: Position) {
        const { column, row } = position;

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
}
