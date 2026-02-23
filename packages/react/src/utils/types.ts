type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type MutuallyExclusive<T, U> = (Without<T, U> & U) | (Without<U, T> & T);
export type Replace<T extends string, From extends string, To extends string> =
    From extends '' ? T :
        T extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${Replace<Suffix, From, To>}` :
            T;

export {};
