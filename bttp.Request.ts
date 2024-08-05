import { Header } from "./bttp.Request.type";
import fqs from "./fqs";

export default class Request {
    header: Header;
    body: any;

    constructor(header: Header, body: any) {
        this.header = header;
        this.body = body;
    }

    post() {
        fqs(this);
    }
}
