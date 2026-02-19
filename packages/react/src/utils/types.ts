type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type MutuallyExclusive<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

export {};
