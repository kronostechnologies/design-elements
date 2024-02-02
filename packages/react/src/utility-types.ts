export type NoSelfReference<T, U extends string> = T extends U ? never : T;
