export function compareAdjacent(list: any[], entriesFunc: ({}) => any) {
    const list1 = list.slice(0, -1);
    const list2 = list.slice(1);

    return list1.map((_, index) => difference(list1[index], list2[index], entriesFunc));
}

export function difference(curList: any[], preList: any[] = [], entriesFunc: ({}) => any) {
    const added = new Map(curList.map(entriesFunc));

    for (const [key, value] of preList.map(entriesFunc)) {
        added.delete(key);
    }
    return added;
}
