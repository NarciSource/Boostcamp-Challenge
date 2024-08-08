export interface Header {
    code: number;
    errorMessage?: string;
    time: number;
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
        this.header = {
            ...header,
            "Content-Type": "application/json",
        };
        this.body = body;
    }
}
