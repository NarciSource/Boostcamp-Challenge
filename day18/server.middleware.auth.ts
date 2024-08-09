import { code } from "./server.code";
import { CamperId } from "./server.type";

export function verifyAuthentication({ camperId }: { camperId: CamperId }) {
    if (!camperId) {
        throw code.UNAUTHORIZED_ACCESS;
    }
}
