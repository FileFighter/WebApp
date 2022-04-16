/**
 * It takes an array and a condition, and returns an array of two arrays, the first of which contains all the elements of
 * the input array that satisfy the condition, and the second of which contains all the elements that don't
 * @param {T[]} input - The array to be divided
 * @param condition - (a: T) => boolean
 * @returns array of two (divided) arrays
 */
export function divideArrayByCondition<T>(
    input: T[],
    condition: (a: T) => boolean
) {
    let output: T[][] = [[], []]

    input.forEach((el: T) => {
        if (!condition(el)) {
            return output[1].push(el)
        }
        output[0].push(el)
    })

    return output
}
