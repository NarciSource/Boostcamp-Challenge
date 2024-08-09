export interface Header {
    code: number;
    message: string;
    "Row-Count"?: number;
    "Content-Type"?: string;
    "Content-Length"?: number;
}

export interface Body {
    data: string;
}
