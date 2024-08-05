export interface Schema {
    fields: {
        [name: string]: {
            type: string;
        };
    }[];
}

type Value = string | number;

export type Tuple = {
    name: string;
    value: Value;
};

export type Condition = Tuple & {
    operand: "=" | ">" | "<";
};

export type Record = {
    id: number;
    [name: string]: Value;
};
