import { Header } from "./bttp.Request.type";
import Response from "./bttp.Response";
import fqs from "./fqs";

export default class Request {
    header: Header;
    body: any;

    constructor(header: Header, body: any) {
        this.header = header;
        this.body = body;
    }

    post(callback: (response: Response) => void) {
        const response = fqs(this);
        callback(response);
    }
}
