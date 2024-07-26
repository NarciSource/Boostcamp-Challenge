import Movie from "./Movie";

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
