import { Socket } from "node:net";

export type CamperId = string;

export type GroupId = number;

export type CommandArg = {
    camperId: CamperId;
    client: Socket;
    targetId?: CamperId;
    message?: string;
    maxCount?: number;
    day?: string;
};

export type GroupInform = {
    groupMembers: CamperId[];
    enableChat: boolean;
    maxCount: number;
};

export type ErrorPair = {
    code: number;
    errorMessage: string;
};

export type NestedMessage = {
    message: string;
    extra: string;
};
