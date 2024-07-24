import LinkedList from "./LinkedList";
import Movie from "./Movie";

describe("리스트 불변성 검사", () => {
    let original_list: LinkedList;

    beforeEach(() => {
        original_list = new LinkedList();
        original_list = original_list
            .add(new Movie({ title: "Movie#1", release_year: 2023, tickets: 3 }))
            .add(new Movie({ title: "Movie#2", release_year: 2015, tickets: 2 }))
            .add(new Movie({ title: "Movie#3", release_year: 2011, tickets: 6 }))
            .add(new Movie({ title: "Movie#4", release_year: 2009, tickets: 8 }))
            .add(new Movie({ title: "Movie#5", release_year: 2007, tickets: 1 }))
            .add(new Movie({ title: "Movie#6", release_year: 2018, tickets: 0 }))
            .add(new Movie({ title: "Movie#7", release_year: 2015, tickets: 4 }))
            .add(new Movie({ title: "Movie#8", release_year: 2014, tickets: 5 }))
            .add(new Movie({ title: "Movie#9", release_year: 2020, tickets: 3 }))
            .add(new Movie({ title: "Movie#10", release_year: 2000, tickets: 1 }))
            .add(new Movie({ title: "Movie#11", release_year: 2016, tickets: 5 }))
            .add(new Movie({ title: "Movie#12", release_year: 2022, tickets: 2 }))
            .add(new Movie({ title: "Movie#13", release_year: 2023, tickets: 21 }));
    });

    test("add", () => {
        const new_list = original_list.add(new Movie({ title: "Movie#15", release_year: 2022 }));

        expect(new_list).not.toEqual(original_list);
    });

    test("delete", () => {
        const new_list = original_list.delete("Movie#2");

        expect(new_list).not.toEqual(original_list);
        expect(new_list.length).toBe(12);
    });

    test("sort by year", () => {
        const sorted_by_date = original_list.sort_by_date().map((movie) => movie.release_year);

        expect(sorted_by_date).toEqual([2000, 2007, 2009, 2011, 2014, 2015, 2015, 2016, 2018, 2020, 2022, 2023, 2023]);
    });

    test("top_10_tickets", () => {
        const top_10_tickets = original_list.top_10_tickets();

        expect(top_10_tickets.length).toBe(10);
    });
});

describe("영화 불변성 검사", () => {
    let movie: Movie;
    beforeEach(() => {
        movie = new Movie({ title: "Movie#1", release_year: 2024 });
    });

    test("update 티켓", () => {
        const new_movie = movie.update({ tickets: 300 });

        expect(new_movie).not.toEqual(movie);
    });

    test("update 상영관", () => {
        const new_movie = movie.update({ theaters: 10 });

        expect(new_movie).not.toEqual(movie);
    });

    test("update 값이 포함되지 않았을 때", () => {
        const new_movie = movie.update({});

        expect(new_movie).toEqual(movie);
    });
});

test("영화 중복 체크", () => {
    const list = new LinkedList();

    expect(() => {
        list.add(new Movie({ title: "Movie#1", release_year: 2024 })).add(new Movie({ title: "Movie#1", release_year: 2024 }));
    }).toThrow();
});
