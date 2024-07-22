const ROW_SIZE = 5;
const COLUMN_SIZE = 6;

export default class Board {
    #board = Array(ROW_SIZE)
        .fill(null)
        .map(() => Array(COLUMN_SIZE).fill(null));

    // please remove this
    board() {
        return this.#board;
    }

    score() {
        const value_sum = this.#board.reduce((acc, columns) => acc + columns.filter((i) => i).reduce((acc, cur) => acc + cur, 0), 0);
        return value_sum;
    }

    display(line_num) {
        return this.#board[line_num];
    }
}
