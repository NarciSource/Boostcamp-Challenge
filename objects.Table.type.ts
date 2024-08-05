export interface Schema {
    columns: {
        name: string;
        type: string;
    }[];
}

export type Record = {
    [column: string]: string;
};

export type Body = Record[];
