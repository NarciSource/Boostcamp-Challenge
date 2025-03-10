export type Schema = {
    fields: {
        [name: string]: {
            type: "Numeric" | "String";
        };
    };
};

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
