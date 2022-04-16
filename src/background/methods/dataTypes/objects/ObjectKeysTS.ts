// `keyof any` is short for "string | number | symbol"
// since an object key can be any of those types, our key can too
// in TS 3.0+, putting just "string" raises an error
// since an object key can be any of those types, our key can too
// in TS 3.0+, putting just "string" raises an error
// https://dev.to/kingdaro/indexing-objects-in-typescript-1cgi
/**
 * "If the key is in the object, return true, otherwise return false."
 *
 * The keyof any is a special type that represents the union of all property names of a given type
 * @param {O} obj The object to check for the key.
 * @param key - keyof any
 * @returns does the given object have the given key
 */
export function hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj
}
