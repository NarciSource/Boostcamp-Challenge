import LinkedList from "./LinkedList";
import Movie from "./Movie";

describe("리스트 불변성 검사", () => {
    let original_list: LinkedList;

    beforeEach(() => {
        original_list = new LinkedList();
        original_list = original_list.add(new Movie({ title: "Movie#1" })).add(new Movie({ title: "Movie#2" }));
    });

    test("add", () => {
        const new_list = original_list.add(new Movie({ title: "Movie#3" }));

        expect(new_list).not.toEqual(original_list);
    });

    test("delete", () => {
        const new_list = original_list.delete("Movie#2");

        expect(new_list).not.toEqual(original_list);
        expect(new_list.length).toBe(1)
    });
});

describe("영화 불변성 검사", () => {
    test("update 티켓", () => {
        const movie = new Movie({ title: "Movie#1" });
        const new_movie = movie.update({ tickets: 300 });

        expect(new_movie).not.toEqual(movie);
    });

    test("update 상영관", () => {
        const movie = new Movie({ title: "Movie#1" });
        const new_movie = movie.update({ theaters: 10 });

        expect(new_movie).not.toEqual(movie);
    });

    test("update 값이 포함되지 않았을 때", () => {
        const movie = new Movie({ title: "Movie#1" });
        const new_movie = movie.update({});

        expect(new_movie).toEqual(movie);
    });
});

test("영화 중복 체크", () => {
    const list = new LinkedList();

    expect(() => {
        list.add(new Movie({ title: "Movie#1" })).add(new Movie({ title: "Movie#1" }));
    }).toThrow();
});
