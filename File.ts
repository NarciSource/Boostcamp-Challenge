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
        this.check_valid(record);

        this.body = [...this.body, record];
    }

    check_valid(record: Record): never | void {
        if (Object.keys(record).length !== this.fields.length) {
            throw { code: "INVALID_FIELD_COUNT" };
        }

        const schema_field_set = new Set(this.schema.fields.map(({ name }) => name));
        const is_field_valid = Object.keys(record).every((field) => schema_field_set.has(field));

        if (!is_field_valid) {
            throw { code: "INVALID_FIELD_MATCHING" };
        }
    }
}
