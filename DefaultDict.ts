export interface DefaultDictProperties<T> {
    [key: string]: T;
}

export default class DefaultDict<T> {
    constructor(defaultFactory: () => T) {
        return new Proxy<DefaultDictProperties<T>>({} as DefaultDictProperties<T>, {
            get: (target, name: string): T => {
                if (!(name in target)) {
                    target[name] = defaultFactory() as T;
                }
                return target[name];
            },
        }) as DefaultDictProperties<T>;
    }
}
