import LinkedListNode, { null_node } from "./LinkedListNode";
import Movie from "./Movie";

export default class LinkedList {
    #head: LinkedListNode;

    constructor(
        movie_list?: { title: string; release_year: number; tickets: number }[],
    ) {
        if (movie_list) {
            let prev_head = null_node;
            let prev_node = prev_head;

            for (const node of movie_list
                .map((each) => new Movie(each))
                .map((movie) => new LinkedListNode({ movie }))) {
                prev_node.next_node = node;
                prev_node = node;
            }
            this.#head = prev_head.next_node;
        }
    }

    add(movie: Movie): LinkedList {
        for (const node of this) {
            const movie_record = node.movie;

            if (movie_record.title === movie.title) {
                throw "같은 영화가 존재합니다.";
            }
        }

        let prev_head = null_node;
        let prev_node = prev_head;

        for (const node of this) {
            const new_node = node.copy();

            prev_node.next_node = new_node;
            prev_node = new_node;
        }
        let last_node = prev_node;

        const node = new LinkedListNode({ movie });
        last_node.next_node = node;

        const new_list = new LinkedList();
        new_list.#head = prev_head.next_node;

        return new_list;
    }

    delete(title: string): LinkedList {
        let prev_head = null_node;
        let prev_node = prev_head;

        for (const node of this) {
            if (node.movie.title !== title) {
                const new_node = node.copy();

                prev_node.next_node = new_node;
                prev_node = new_node;
            }
        }
        prev_node.next_node = null;

        const new_list = new LinkedList();
        new_list.#head = prev_head.next_node;

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

    [Symbol.iterator]() {
        let iter: LinkedListNode = this.#head;

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
