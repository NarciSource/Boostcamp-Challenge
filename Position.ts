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

export const ROW_SIZE = 5;
export const COLUMN_SIZE = 6;

export default class Position {
    row: Row;
    column: Column;

    constructor(row: Row, column: Column) {
        this.row = row;
        this.column = column;
    }

    static random(): Position {
        const row: Row = choice(get_values(Row));
        const column: Column = choice(get_values(Column));

        return new Position(row, column);
    }

    static distance(pos1: Position, pos2: Position): { y: number; x: number } {
        return { y: pos2.row - pos1.row, x: pos2.column - pos1.column };
    }
}

export const get_values = (cls: typeof Column | typeof Row) =>
    Object.values(cls).filter((value) => typeof value === "number");

export const get_keys = (cls: typeof Column | typeof Row) =>
    Object.values(cls).filter((value) => typeof value !== "number");
