export interface Schema {
    fields: {
        name: string;
        type: string;
    }[];
}

export type Record = {
    [field: string]: string;
};

export type Body = Record[];
