export interface Header {
    command: string;
    "Content-Type"?: string;
}

export default class Request {
    header: Header;
    body: any;

    constructor(header: Header, body: any) {
        this.header = header;
        this.body = body;
    }
}
