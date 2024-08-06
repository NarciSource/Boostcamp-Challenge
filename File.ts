import { code } from "./File.code";
import { Body, Condition, Record, Schema, Tuple } from "./File.type";
import { compare } from "./utils";

export default class File {
    schema: Schema;
    body: Body;

    constructor(schema: Schema, body?: Body) {
        this.schema = schema;
        this.body = body || [];

        this.validate();
    }

    indexing() {
        this.schema.fields = { ...this.schema.fields, id: { type: "Numeric" } };
        this.body = this.body.map((record, index) => ({ ...record, id: index + 1 }));
    }

    validate() {
        this.indexing();

        for (const record of this.body) {
            if (this.fields.length <= 1 || this.fields.length >= 9) {
                throw { code: code.INVALID_FIELD_LENGTH };
            }

            if (Object.keys(record).length !== this.fields.length) {
                throw { code: code.INVALID_FORMAT };
            }

            for (const [name, value] of Object.entries(record)) {
                const type = this.schema.fields[name].type;

                if (type === "Numeric" && isNaN(Number(value))) {
                    throw { code: code.INVALID_TYPE };
                }

                if (/\s/.test(value.toString())) {
                    throw { code: code.INVALID_WHITESPACE };
                }

                if (value === null) {
                    throw { code: code.INVALID_NULL_VALUE };
                }
            }
        }
    }

    get fields(): string[] {
        return Object.keys(this.schema.fields);
    }

    insert(record: Record) {
        this.validate_insert(record);

        this.body = [...this.body, record];
        this.validate();
    }

    select({ name, value, operand }: Condition): Record[] {
        try {
            const records = this.body.filter((field) => compare(field[name], value, operand));

            if (records.length) {
                return records;
            } else {
                throw { code: code.NOT_FOUND_RECORD };
            }
        } catch (error) {
            throw { code: code.INVALID_FIELD_TYPE_MATCHING };
        }
    }

    update(restore: Tuple, condition: Condition): Record[] {
        const selected = this.select(condition);

        this.body = this.body.map((record) => {
            if (compare(record[condition.name], condition.value, condition.operand)) {
                record[restore.name] = restore.value;
            }
            return record;
        });

        this.validate();
        return selected;
    }

    delete(condition: Condition): Record[] {
        const selected = new Set(this.select(condition));

        this.body = this.body.filter((record) => !selected.has(record));
        return [...selected];
    }

    validate_insert(record: Record): never | void {
        if (Object.keys(record).length !== this.fields.length - 1) {
            throw { code: code.INVALID_FIELD_COUNT };
        }

        const schema_field_set = new Set(this.fields);
        const is_field_valid = Object.keys(record).every((field) => schema_field_set.has(field));

        if (!is_field_valid) {
            throw { code: code.INVALID_FIELD_MATCHING };
        }
    }
}
