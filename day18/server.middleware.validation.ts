import { code } from "./server.code";
import { getBytes } from "./utils";

export function validateStringBounds(arg: any): void {
    if (getBytes(arg) > 1024) {
        throw code.MESSAGE_SIZE_EXCEED;
    }
}
