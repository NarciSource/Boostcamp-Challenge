export default class EventLooper<T> {
    queue: T[] = [];

    constructor() {
        setInterval(() => this.watcher(), 1000);
    }

    set_watcher(watcher: () => void, context: Object) {
        this.watcher = watcher.bind(context);
    }

    watcher() {}
}
