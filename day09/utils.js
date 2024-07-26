export function sleep(milliseconds) {
    const start = Date.now();
    let now = null;
    do {
        now = Date.now();
    } while (now - start < milliseconds);
}
