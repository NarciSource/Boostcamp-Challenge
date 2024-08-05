export interface Schema {
    fields: {
        [name: string]: {
            type: string;
        };
    }[];
}

export type Record = {
    id: number;
    [field: string]: string | number;
};

export type Body = Record[];
