export default class Movie {
    title: string;
    release_year: number;
    director: string;
    main_actor_A: string;
    main_actor_B: string;
    number_of_audience: number;
    number_of_theaters: number;

    constructor(title: string) {
        this.title = title;
    }
}
