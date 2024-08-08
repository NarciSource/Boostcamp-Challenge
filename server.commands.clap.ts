export let clapCount = 0;

export function countClap() {
    clapCount++;
}

export default function clap(): string {
    const message = `clap count is ${clapCount}`;

    return message;
}
