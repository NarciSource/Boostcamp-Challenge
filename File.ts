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

    select([condition_column, condition_value]): Record[] {
        const records = this.body.filter((field) => field[condition_column] === condition_value);
        if (records.length) {
            return records;
        } else {
            throw { code: "NOT_FOUND_RECORD" };
        }
    }

    update([restore_column, restore_value], [condition_column, condition_value]): Record[] {
        const selected = this.select([condition_column, condition_value]);

        this.body = this.body.map((record) => {
            if (record[condition_column] === condition_value) {
                record[restore_column] = restore_value;
            }
            return record;
        });

        return selected;
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
