import LinkedListNode from "./LinkedListNode";
import Movie from "./Movie";

export default class LinkedList {
    #head: LinkedListNode;
    #tail: LinkedListNode;

    constructor() {}

    add(movie: Movie): LinkedList {
        const node = new LinkedListNode(movie);
        const new_list = new LinkedList();

        new_list.#head = this.#head;
        new_list.#tail = this.#tail;

        if (!new_list.#head) {
            new_list.#head = node;
        } else {
            new_list.#tail.next_node = node;
        }

        new_list.#tail = node;

        return new_list;
    }
}
