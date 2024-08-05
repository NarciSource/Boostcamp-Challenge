import { Body, Record, Schema } from "./File.type";

export default class File {
    schema: Schema;
    body: Body;

    constructor(schema: Schema, body?: Body) {
        this.schema = schema;
        this.body = body || [];

        this.validate();
    }

    indexing() {
        this.body = this.body.map((record, id) => ({ ...record, id }));
    }

    validate() {
        for (const record of this.body) {
            if (this.fields.length < 1 || this.fields.length > 9) {
                throw { code: "INVALID_FIELD_LENGTH" };
            }

            if (Object.keys(record).length !== this.fields.length) {
                throw { code: "INVALID_FORMAT" };
            }

            for (const [name, value] of Object.entries(record)) {
                const type = this.schema.fields[name].type;

                if (type === "Numeric" && isNaN(Number(value))) {
                    throw { code: "INVALID_TYPE" };
                }
            }
        }
        this.indexing();
    }

    get fields(): string[] {
        return Object.keys(this.schema.fields);
    }

    insert(record: Record) {
        this.validate_insert(record);

        this.body = [...this.body, record];
        this.validate();
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

        this.validate();
        return selected;
    }

    validate_insert(record: Record): never | void {
        if (Object.keys(record).length !== this.fields.length) {
            throw { code: "INVALID_FIELD_COUNT" };
        }

        const schema_field_set = new Set(this.fields);
        const is_field_valid = Object.keys(record).every((field) => schema_field_set.has(field));

        if (!is_field_valid) {
            throw { code: "INVALID_FIELD_MATCHING" };
        }
    }
}
