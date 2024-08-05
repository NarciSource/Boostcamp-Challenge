import readTable from "./objects.Table.read";

export default function select(
    table_name: string,
    [condition_column, condition_value]: [string, string],
) {
    const table = readTable(table_name);

    const found_fields = table.body.filter((record) => {
        return record[condition_column] === condition_value;
    });

    console.log("<<<<<<<<");
    console.log(found_fields);
}
