export enum code {
    INVALID_ID,
    ID_ALREADY_EXISTS,
    MAX_COUNT_OVER,
    CHAT_NOT_ENABLED,
    MESSAGE_SIZE_EXCEED,
}

export function getError(error: code): { code: number; errorMessage: string } {
    switch (error) {
        case code.INVALID_ID:
            return { code: 400, errorMessage: "CamperId is larger than 0 and smaller than 256." };

        case code.ID_ALREADY_EXISTS:
            return { code: 403, errorMessage: "Already checked in. Try another camperId." };

        case code.MAX_COUNT_OVER:
            return { code: 400, errorMessage: "MaxCount is over. Please reset Count" };

        case code.CHAT_NOT_ENABLED:
            return { code: 400, errorMessage: "You did not opened chat." };

        case code.MESSAGE_SIZE_EXCEED:
            return { code: 400, errorMessage: "The message size exceeds the allowed limit." };

        default:
            return { code: 400, errorMessage: "It's your fault anyway." };
    }
}
