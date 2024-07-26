import Movie from "./Movie";

export default class LinkedListNode {
    movie: Movie;
    #next_node: LinkedListNode;

    constructor({
        movie,
        next_node,
    }: {
        movie?: Movie;
        next_node?: LinkedListNode;
    }) {
        this.movie = movie;
        this.next_node = next_node;
    }

    copy(): LinkedListNode {
        return new LinkedListNode({ ...this });
    }

    get next_node(): LinkedListNode {
        return this.#next_node;
    }
    set next_node(node: LinkedListNode) {
        this.#next_node = node;
    }
}

export const null_node = new LinkedListNode({});
