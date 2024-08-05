import readTable from "./objects.Table.read";
import header_parse from "./parser.header";
import condition_parse from "./parser.condition";

export default function select(raw: string) {
    const header = header_parse(raw.split("\r\n")[0]);
    const [condition_column, condition_value] = condition_parse(raw.split("\r\n")[1]);

    const table = readTable(header);

    const found_fields = table.body.filter((record) => {
        return record[condition_column] === condition_value;
    });

    console.log("<<<<<<<<");
    console.log(found_fields);
}
