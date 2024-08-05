import { Body, Record, Schema } from "./File.type";

export default class File {
    schema: Schema;
    body: Body;

    constructor(schema: Schema, body?: Body) {
        this.schema = schema;
        this.body = body || [];
    }

    get fields(): string[] {
        return this.schema.fields.map((field) => field.name);
    }

    insert(record: Record) {
        this.body = [...this.body, record];
    }
}
