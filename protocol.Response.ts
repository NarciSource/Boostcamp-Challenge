export interface Header {
    code: number;
    time: number;
    errorMessage?: string;
    "Content-Type"?: string;
    "Content-Length"?: number;
}

export interface Body {
    data: string;
}

export default class Response {
    header: Header;
    body: any;

    constructor(header: Header, body?: any) {
        this.header = header;
        this.body = body;
    }
}
