import { Header } from "./bttp.Response.type";

export default class Response {
    header: Header;
    body: any;

    constructor(header: Header, body?: any) {
        this.header = header;
        this.body = body;
    }
}
