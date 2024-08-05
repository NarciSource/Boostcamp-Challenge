interface Header {
    query_type: string;
    table: string;
    bttp: string;
}

type Body = string[];

export default class RequestObject {
    header: Header;
    body: Body;

    constructor(header: Header, body: Body) {
        this.header = header;
        this.body = body;
    }

    static parse(str: string): RequestObject {
        console.log(">>>>>>>>");
        console.log(str);

        const lines = str.split("\r\n");
        const header = (([query_type, table, bttp]) => ({ query_type, table, bttp } as Header))(
            lines[0].split(" "),
        );
        const body = lines.splice(1);

        return new RequestObject(header, body);
    }
}
