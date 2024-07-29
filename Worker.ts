export default abstract class Worker {
    free = true;

    abstract alarm(): void;
}
