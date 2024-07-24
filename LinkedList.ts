import LinkedListNode from "./LinkedListNode";
import Movie from "./Movie";

export default class LinkedList {
    head: LinkedListNode;
    tail: LinkedListNode;

    constructor() {}

    add(movie: Movie): LinkedList {
        const node = new LinkedListNode(movie);
        const new_list = new LinkedList();

        for (const node of this) {
            const movie_record = node.value;
            if (movie_record.title === movie.title) {
                throw "같은 영화가 존재합니다.";
            }
        }

        new_list.head = this.head;
        new_list.tail = this.tail;

        if (!new_list.head) {
            new_list.head = node;
        } else {
            new_list.tail.next_node = node;
        }

        new_list.tail = node;

        return new_list;
    }

    [Symbol.iterator]() {
        let iter: LinkedListNode = this.head;

        return {
            next: () => {
                if (iter) {
                    const value = iter;

                    iter = iter.next_node;
                    return { value, done: false };
                } else {
                    return { value: undefined, done: true };
                }
            },
        };
    }
}
