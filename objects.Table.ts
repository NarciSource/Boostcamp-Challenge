import { Body, Record, Schema } from "./objects.Table.type";

export default class Table {
    schema: Schema;
    body: Body;

    constructor(schema: Schema, body?: Body) {
        this.schema = schema;
        this.body = body || [];
    }

    get columns(): string[] {
        return this.schema.columns.map((column) => column.name);
    }

    insert(record: Record) {
        this.body = [...this.body, record];
    }
}
