const ROW_SIZE = 5;
const COLUMN_SIZE = 6;

export default class Board {
    #board = Array(ROW_SIZE)
        .fill(null)
        .map(() => Array(COLUMN_SIZE).fill(null));

    #characters;

    // please remove this
    board() {
        return this.#board;
    }

    score() {
        const value_sum = this.#board.reduce((acc, columns) => acc + columns.filter((i) => i).reduce((acc, cur) => acc + cur, 0), 0);
        return value_sum;
    }

    set(position, character) {
        const { column, row } = position;

        if (row<0 || column<0 || row>=ROW_SIZE || column >=COLUMN_SIZE) {
            throw "보드 범위를 벗어나 있습니다."
        }
        if (this.#board[row][column]) {
            throw "해당 위치에 다른 말이 있습니다.";
        }

        this.#board[row][column] = character;
    }

    display(line_num) {
        return this.#board[line_num];
    }
}
