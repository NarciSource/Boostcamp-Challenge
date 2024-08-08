export function sendError(error: string): string {
    switch (error) {
        case "ID_LARGER_THAN_256": {
            return "camperId is larger than 0 and smaller than 256.\n";
        }
        case "ID_ALREADY": {
            return "already checked in. try another camperId.\n";
        }
        case "maxCountOver": {
            return "maxCount is over. please reset Count";
        }
        case "notIsChat": {
            return "you did not opened chat.";
        }
    }
}
