export type CamperId = string;

export type CommandArg = {
    camperId?: CamperId;
    targetId?: CamperId;
    message?: string;
    maxCount?: number;
    day?: string;
};

export type NestedMessage = {
    message: string;
    extra: string;
};

