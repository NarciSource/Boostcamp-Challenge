import LinkedList from "./LinkedList";
import Movie from "./Movie";

describe("불변성 검사", () => {
    let original_list: LinkedList;

    beforeEach(() => {
        original_list = new LinkedList();
    });

    test("add", () => {
        const new_list = original_list.add(new Movie());

        expect(new_list).not.toEqual(original_list);
    });
});
