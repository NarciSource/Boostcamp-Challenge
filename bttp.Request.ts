import { Header } from "./bttp.Request.type";
import Response from "./bttp.Response";
import server from "./server";

export default class Request {
    header: Header;
    body: any;

    constructor(header: Header, body: any) {
        this.header = header;
        this.body = body;
    }

    async post(): Promise<Response> {
        const response = await server(this);
        return response;
    }
}
