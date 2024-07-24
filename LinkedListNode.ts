import Movie from "./Movie";

export default class LinkedListNode {
    movie: Movie;
    prev_node: LinkedListNode;
    next_node: LinkedListNode;

    constructor({ movie, prev_node, next_node }: { movie: Movie; prev_node?: LinkedListNode; next_node?: LinkedListNode }) {
        this.movie = movie;
        this.prev_node = prev_node;
        this.next_node = next_node;
    }

    copy() {
        return new LinkedListNode({ ...this });
    }
}

export const emptyNode = new LinkedListNode({ movie: new Movie({ title: "", release_year: 0 }) });
