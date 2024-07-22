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
        const { row, column } = position;

        if (this.#board[row][column]) {
            throw "해당 위치에 다른 말이 있습니다.";
        }

        this.#board[row][column] = character;
    }

    has(character_type: typeof Character) {
        return this.#board
            .flat()
            .filter((space) => space instanceof Character)
            .find((character: Character) => character instanceof character_type);
    }

    attack(character_type: typeof Character, position: Position): string {
        const { row, column } = position;

        const target = this.#board[row][column];

        if (target) {
            target.reduce_hp(character_type.power);

            if (target.hp() === 0) {
                this.#board[row][column] = null;
            }
            return "Attack";
        }
        return "Miss";
    }

    display(line_num) {
        return this.#board[line_num];
    }
}
