export function* zip(arr1: any[], arr2: any[]) {
    for (let i = 0; i < arr1.length; i++) {
        yield [arr1[i], arr2[i]];
    }
}
