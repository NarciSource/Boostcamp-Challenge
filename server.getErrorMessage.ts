import { code } from "./server.code";

export default function getErrorMessage(error: code): string {
    switch (error) {
        case code.INVALID_ID:
            return "CamperId is larger than 0 and smaller than 256.\n";

        case code.ID_ALREADY_EXISTS:
            return "Already checked in. Try another camperId.\n";

        case code.MAX_COUNT_OVER:
            return "MaxCount is over. Please reset Count";

        case code.CHAT_NOT_ENABLED:
            return "You did not opened chat.";

        case code.MESSAGE_SIZE_EXCEED:
            return "The message size exceeds the allowed limit. ";
    }
}
