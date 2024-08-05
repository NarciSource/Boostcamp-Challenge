import Table from "./objects.Table";

export interface Header {
    query_type: string;
    table_name: string;
    bttp: string;
}

export default class RequestObject {
    header: Header;
    table: Table;

    constructor(header: Header, table: Table) {
        this.header = header;
        this.table = table;
    }
}
