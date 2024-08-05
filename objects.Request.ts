interface Header {
    query_type: string;
    bttp: string;
}

interface Schema {
    table_name: string;
    columns: {
        name: string;
        type: string;
    }[];
}

export default class RequestObject {
    header: Header;
    schema: Schema;

    constructor(header: Header, schema: Schema) {
        this.header = header;
        this.schema = schema;
    }

    static make(str: string): RequestObject {
        try {
            const header_regex = /(\w+) (\w+) (\w+)/;
            const columns_regex = /\s*[c|C]olumn:\s*(\w+)\s*=\s*(\w+)\s*/;

            console.log(">>>>>>>>");
            console.log(str);

            const lines = str.split("\r\n");
            const [, query_type, table_name, bttp] = header_regex.exec(lines[0]);
            const header: Header = { query_type, bttp };

            const columns: Schema["columns"] = lines
                .slice(1)
                .map((line) => columns_regex.exec(line))
                .map(([, name, type]) => ({ name, type }));

            const schema: Schema = {
                table_name,
                columns,
            };

            return new RequestObject(header, schema);
        } catch (e) {
            console.error("파일이 올바르지 않은 포맷입니다.");
        }
    }
}

export const make_table = RequestObject.make;
