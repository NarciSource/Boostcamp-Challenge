export const random = (start: number, end: number) => Math.floor(Math.random() * end - start) + start;
export const choice = (array: any[]) => array[random(0, array.length)];
