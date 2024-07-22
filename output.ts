import Character from "./Character";
import { get_nickname } from "./nickname_character";
import { Row } from "./Position";

export default function output(characters: Character[][]) {
    console.log(` |01|02|03|04|05|06|`);
    for (const [index, columns] of characters.entries()) {
        const nick_name_columns = columns.map((character) =>
            character ? get_nickname(character) : "..",
        );

        console.log(`${Row[index]}|${nick_name_columns.join("|")}|`);
    }
    console.log(` |01|02|03|04|05|06|`);
}
