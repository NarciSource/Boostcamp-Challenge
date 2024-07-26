export default class Movie {
    title: string;
    release_year: number;
    director: string;
    main_actor_A: string;
    main_actor_B: string;
    tickets: number;
    theaters: number;

    constructor({
        title,
        release_year,
        tickets,
        theaters,
    }: {
        title: string;
        release_year: number;
        tickets?: number;
        theaters?: number;
    }) {
        this.title = title;
        this.release_year = release_year;
        this.tickets = tickets;
        this.theaters = theaters;
    }

    update({ tickets, theaters }: { tickets?: number; theaters?: number }) {
        return tickets || theaters
            ? new Movie({ ...this, tickets, theaters })
            : this;
    }
}
