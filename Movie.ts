export default class Movie {
    title: string;
    release_year: number;
    director: string;
    main_actor_A: string;
    main_actor_B: string;
    tickets: number;
    theaters: number;

    constructor({ title, tickets, theaters }: { title: string; tickets?: number; theaters?: number }) {
        this.title = title;
        this.tickets = tickets;
        this.theaters = theaters;
    }

    update({ tickets, theaters }: { tickets?: number; theaters?: number }) {
        return tickets || theaters ? new Movie({ ...this, tickets, theaters }) : this;
    }
}
