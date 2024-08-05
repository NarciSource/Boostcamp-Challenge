import readTable from "./File.read";

export default function select(
    table_name: string,
    [condition_column, condition_value]: [string, string],
) {
    const file = readTable(table_name);

    const found_fields = file.body.filter((record) => {
        return record[condition_column] === condition_value;
    });

    console.log("<<<<<<<<");
    console.log(found_fields);
}
