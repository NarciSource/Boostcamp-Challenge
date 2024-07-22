import { choice } from "./utils";

export enum Row {
    A,
    B,
    C,
    D,
    E,
}
export enum Column {
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
}

export default class Position {
    row: Row;
    column: Column;

    constructor(row: Row, column: Column) {
        this.row = row;
        this.column = column;
    }

    static random() {
        const row: Row = choice(Object.values(Row).filter((value) => typeof value === "number")); // random_of(Row) as Row;
        const column: Column = choice(Object.values(Column).filter((value) => typeof value === "number"));

        return new Position(row, column);
    }

    static distance(pos1: Position, pos2: Position): { y: number; x: number } {
        return { y: pos2.row - pos1.row, x: pos2.column - pos1.column };
    }
}
