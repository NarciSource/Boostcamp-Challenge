import LinkedListNode, { null_node } from "./LinkedListNode";
import Movie from "./Movie";

export default class LinkedList {
    #head: LinkedListNode;

    constructor(
        movie_list?: { title: string; release_year: number; tickets: number }[],
    ) {
        if (movie_list) {
            this.#head = movie_list
                .map((each) => new Movie(each))
                .reduce(
                    (next_node, movie) =>
                        new LinkedListNode({ movie, next_node }),
                    null_node,
                );
        }
    }

    add(movie: Movie): LinkedList {
        if (
            this.some(
                (node: LinkedListNode) => node.movie.title === movie.title,
            )
        ) {
            throw "같은 영화가 존재합니다.";
        }

        const new_list = new LinkedList();
        new_list.#head = new LinkedListNode({ movie, next_node: this.#head });

        return new_list;
    }

    delete(title: string): LinkedList {
        const new_list = new LinkedList();

        new_list.#head = [...this].reduce(
            (next_node, node) =>
                node.movie.title !== title && node !== null_node
                    ? new LinkedListNode({ ...node, next_node })
                    : next_node,
            null_node,
        );

        return new_list;
    }

    sort_by_date(): Movie[] {
        return this.movies.sort(
            (movie_a, movie_b) => movie_a.release_year - movie_b.release_year,
        );
    }

    top_10_tickets(): Movie[] {
        return this.movies
            .sort((movie_a, movie_b) => movie_b.tickets - movie_a.tickets)
            .slice(0, 10);
    }

    find_by({
        director,
        actor,
    }: {
        director?: string;
        actor?: string;
    }): string[] {
        return [
            ...this.movies.filter((movie) => movie.main_actor_A === actor),
            ...this.movies.filter((movie) => movie.main_actor_B === actor),
            ...this.movies.filter((movie) => movie.director === director),
        ].map((movie) => movie.title);
    }

    total_theaters(): number {
        return this.movies
            .map((movie) => movie.theaters)
            .filter((i) => i)
            .reduce((acc, cur) => acc + cur, 0);
    }

    get movies(): Movie[] {
        return [...this].map((node) => node.movie);
    }

    get length(): number {
        return [...this].length;
    }

    some(func: Function): boolean {
        for (const node of this) {
            if (func(node)) {
                return true;
            }
        }
        return false;
    }

    [Symbol.iterator]() {
        let iter: LinkedListNode = this.#head;

        return {
            next: () => {
                if (iter && iter !== null_node) {
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
