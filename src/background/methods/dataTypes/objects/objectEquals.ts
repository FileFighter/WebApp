/**
 * It compares the keys of two objects and returns true if they are equal
 * @param {object | any} object1 - The first object to compare.
 * @param {object | any} object2 - The second object to compare.
 * @returns are objects equal in sense of having the same keys?
 */
function objectEquals(object1: object | any, object2: object | any): boolean {
    let areEqual = true

    //keylength
    if (Object.keys(object1).length === Object.keys(object2).length)
        return false

    //compare keys
    Object.keys(object1).forEach((key) => {
        if (object1[key] !== object2[key]) {
            areEqual = false
        }
    })

    return areEqual
}

export default objectEquals
