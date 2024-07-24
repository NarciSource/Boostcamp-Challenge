import LinkedListNode, { emptyNode } from "./LinkedListNode";
import Movie from "./Movie";

export default class LinkedList {
    head: LinkedListNode;
    tail: LinkedListNode;

    constructor() {}

    add(movie: Movie): LinkedList {
        const node = new LinkedListNode({ movie });
        const new_list = new LinkedList();

        for (const node of this) {
            const movie_record = node.movie;
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

    delete(title: string): LinkedList {
        let prev_head = emptyNode;
        let prev_node = prev_head;
        for (const node of this) {
            if (node.movie.title !== title) {
                const new_node = node.copy();

                new_node.prev_node = prev_node;
                prev_node.next_node = new_node;
                prev_node = new_node;
            }
        }
        prev_node.next_node = null;

        const new_list = new LinkedList();
        new_list.head = prev_head.next_node;

        return new_list;
    }

    get length(): number {
        return [...this].length;
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
