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
        function random_of(_enum: typeof Row | typeof Column): Row | Column {
            const values = Object.values(_enum).filter((value) => typeof value === "number");
            const random_index = Math.floor(Math.random() * values.length);
            return values[random_index];
        }

        const row = random_of(Row) as Row;
        const column = random_of(Column) as Column;

        return new Position(row, column);
    }
}
