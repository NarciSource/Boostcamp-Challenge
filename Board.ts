import Character from "./Character";
import Player from "./Player";
import Position from "./Position";
import { ROW_SIZE } from "./Position.Row";
import { COLUMN_SIZE } from "./Position.Column";
import Ultron from "./Character.Ultron";
import { identity } from "./utils";

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

    score(): number {
        return this.#board
            .map((columns) => columns.filter(identity))
            .reduce(
                (acc, columns) =>
                    acc + columns.reduce((acc, cur) => acc + cur.hp(), 0),
                0,
            );
    }
    ultron_score(): number {
        return this.#board
            .map((columns) =>
                columns
                    .filter(identity)
                    .filter((space) => space instanceof Ultron),
            )
            .reduce(
                (acc, columns) =>
                    acc + columns.reduce((acc, cur) => acc + cur.hp(), 0),
                0,
            );
    }

    set_piece_init(position: Position, character: Character) {
        const { row } = position;

        if (this.get(position)) {
            throw "해당 위치에 다른 말이 있습니다.";
        }
        if (this.#board[row].filter((i) => i).length >= 3) {
            throw "행에는 최대 3개까지만 배치할 수 있습니다.";
        }

        this.set(position, character);
    }
    set_piece(position: Position, character: Character) {
        if (this.get(position)) {
            throw "해당 위치에 다른 말이 있습니다.";
        }

        this.set(position, character);
    }

    has(character_type: typeof Character) {
        return this.#board
            .flat()
            .filter((space) => space instanceof Character)
            .find((character) => character instanceof character_type);
    }

    get(position: Position): Character {
        const { row, column } = position;
        return this.#board[row][column];
    }
    set(position: Position, value: Character): void {
        const { row, column } = position;
        this.#board[row][column] = value;
    }

    attack(character_type: typeof Character, position: Position): string {
        const target = this.get(position);

        if (target) {
            target.reduce_hp(character_type.power);
            this.hit();

            if (target.hp() === 0) {
                this.set(position, null);
            }
            return `HIT (${this.#hit_time})`;
        }
        return "Miss";
    }

    hit(setting?: number) {
        if (setting) {
            this.#hit_time = setting;
        } else {
            this.#hit_time++;
        }

        if (this.#hit_time >= 5) {
            this.#can_move = true;
        } else {
            this.#can_move = false;
        }
    }

    move(from_position: Position, to_position: Position) {
        if (!this.#can_move) {
            throw "5hit 조건을 만족하지 못했습니다.";
        }

        const character = this.get(from_position);
        const target_position = this.get(to_position);
        const distance = Position.distance(from_position, to_position);

        if (!character) {
            throw "캐릭터가 존재하지 않습니다.";
        }
        if (target_position) {
            throw "움직이려는 위치에 다른 캐릭터가 있습니다.";
        }
        if (!character.can_move(distance)) {
            throw "캐릭터가 이동할 수 없는 움직임입니다.";
        }

        this.set_piece(to_position, character);
        this.set(from_position, null);

        this.hit(0);
    }

    just_one_question = true;
    question(): Character[] {
        if (this.just_one_question) {
            this.just_one_question = false;

            const max_row = this.#board
                .map((columns) => columns.filter(identity))
                .reduce(
                    (max_row, columns, row, board) =>
                        columns.length > board[max_row].length ? row : max_row,
                    0,
                );
            return this.#board[max_row];
        } else {
            throw "한 번만 사용할 수 있습니다.";
        }
    }

    display(): Character[][] {
        return this.#board;
    }
}
