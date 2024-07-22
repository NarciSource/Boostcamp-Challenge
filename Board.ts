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
    #hit_time = 0;
    #can_move = false;

    constructor(owner: Player) {
        this.#owner = owner;
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
        if (this.#board[row].filter((i) => i).length >= 3) {
            throw "행에는 최대 3개까지만 배치할 수 있습니다.";
        }

        this.#board[row][column] = character;
    }
    set_piece(position: Position, character: Character) {
        const { row, column } = position;
        if (this.#board[row][column]) {
            throw "해당 위치에 다른 말이 있습니다.";
        } else {
            this.#board[row][column] = character;
        }
    }

    has(character_type: typeof Character) {
        return this.#board
            .flat()
            .filter((space) => space instanceof Character)
            .find((character: Character) => character instanceof character_type);
    }

    get(position: Position): Character {
        const { row, column } = position;
        return this.#board[row][column];
    }

    attack(character_type: typeof Character, position: Position): string {
        const { row, column } = position;

        const target = this.#board[row][column];

        if (target) {
            target.reduce_hp(character_type.power);
            this.hit();

            if (target.hp() === 0) {
                this.#board[row][column] = null;
            }
            return `HIT (${this.#hit_time})`;
        }
        return "Miss";
    }

    hit() {
        if (this.#hit_time === 5) {
            this.#can_move = true;
        } else {
            this.#hit_time++;
        }
    }

    move(from_position: Position, to_position: Position) {
        if (this.#can_move) {
            const character = this.get(from_position);
            const target_position = this.get(to_position);
            const distance = Position.distance(from_position, to_position);

            if (character) {
                if (!target_position) {
                    if (character.can_move(distance)) {
                        this.set_piece(to_position, character);
                        this.#board[from_position.row][from_position.column] = null;

                        this.#hit_time = 0;
                    } else {
                        throw "캐릭터가 이동할 수 없는 움직임입니다.";
                    }
                } else {
                    throw "움직이려는 위치에 다른 캐릭터가 있습니다.";
                }
            } else {
                throw "캐릭터가 존재하지 않습니다.";
            }
        } else {
            throw "조건을 만족하지 못했습니다.";
        }
    }

    just_one_question = true;
    question(): Character[] {
        if (this.just_one_question) {
            this.just_one_question = false;

            const max_row = this.#board.map((columns) => columns.filter((i) => i)).reduce((max_row, columns, row, board) => (columns.length > board[max_row].length ? row : max_row), 0);
            return this.#board[max_row];
        } else {
            throw "한 번만 사용할 수 있습니다.";
        }
    }

    display(): Character[][] {
        return this.#board;
    }
}
