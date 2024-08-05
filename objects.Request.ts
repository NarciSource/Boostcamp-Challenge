export interface Header {
    query_type: string;
    table_name: string;
    bttp: string;
}

export interface Schema {
    columns: {
        name: string;
        type: string;
    }[];
}

export interface Field {
    [column: string]: string;
}

export type Body = Field[];

export default class RequestObject {
    header: Header;
    schema: Schema;
    body: Body;

    constructor(header: Header, schema: Schema, body?: Body) {
        this.header = header;
        this.schema = schema;
        this.body = body || [];
    }

    get columns(): string[] {
        return this.schema.columns.map((column) => column.name);
    }

    insert(field: Field) {
        this.body = [...this.body, field];
    }
}
