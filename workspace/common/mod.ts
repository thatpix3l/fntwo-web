/**
 * Construct a type with the properties of `T` except strictly for those in type `K`.
 */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>;
