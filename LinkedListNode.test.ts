import LinkedListNode from "./LinkedListNode";
import Movie from "./Movie";

describe("노드 테스트", () => {
    let node: LinkedListNode;
    beforeEach(() => {
        node = new LinkedListNode({
            movie: new Movie({ title: "Movie#1", release_year: 2024 }),
        });
    });

    test("복사", () => {
        const copy_node = node.copy();

        expect(copy_node).not.toBe(node);
        expect(copy_node).toEqual(node);
    });
});
