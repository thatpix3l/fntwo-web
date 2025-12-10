/**
 * Construct a type with the properties of `T` except strictly for those in type `K`.
 */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

/**
 * CSS-related utilities.
 */
export * as css from "./css.ts";
