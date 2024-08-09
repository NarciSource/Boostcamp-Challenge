export function* zip(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        yield [arr1[i], arr2[i]];
    }
}
