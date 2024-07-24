export default class Movie {
    title: string;
    release_year: number;
    director: string;
    main_actor_A: string;
    main_actor_B: string;
    tickets: number;
    number_of_theaters: number;

    constructor({ title, tickets }: { title: string; tickets?: number }) {
        this.title = title;
        this.tickets = tickets;
    }

    update(tickets?: number) {
        return tickets ? new Movie({ ...this, tickets }) : this;
    }
}
