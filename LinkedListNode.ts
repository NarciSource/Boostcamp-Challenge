import Movie from "./Movie";

export default class LinkedListNode {
    value: Movie;
    next_node: LinkedListNode;

    constructor(movie: Movie) {
        this.value = movie;
    }
}
