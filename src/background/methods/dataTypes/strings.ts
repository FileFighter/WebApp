/**
 * If the string is empty, return an empty string, otherwise return the reverse of the string
 * @param {string} string - the string to reverse
 * @returns The last character of the string is being returned first, followed by the second to last character, and so on.
 */
export function reverseString(string: string): string {
    if (string === "") return ""
    else return reverseString(string.substr(1)) + string.charAt(0)
}

/**
 * Replace a substring in a string, but only once, from the beginning and end of the string.
 * @param {string} string - The string to be modified.
 * @param {string} substring - The substring to replace.
 * @param {string} replaceWith - The string to replace the substring with.
 * @returns The string with the first and last instances of the substring replaced with the replaceWith string.
 * @example
 * ```
 * // returns "Muad'DibPaulAtreidesPaulMuad'Dib"
 * let newString = stringReplaceSubstringOneTimeFromBeginningAndEnd("PaulPaulAtreidesPaulPaul","Paul","Muad'Dib");
 * ```
 */
export function stringReplaceSubstringOneTimeFromBeginningAndEnd(
    string: string,
    substring: string,
    replaceWith: string
): string {
    string = string.replace(substring, replaceWith)
    string = reverseString(string)
    string = string.replace(substring, replaceWith)
    string = reverseString(string)
    return string
}

/**
 * This function takes a string and returns a string with all spaces removed.
 * @param {string} string - The string to be modified.
 * @returns A string with all spaces removed.
 */
export function deleteSpaces(string: string): string {
    return string.replace(/\s/, "")
}

/**
 * If the string is longer than the maxLength, return a substring of the string, otherwise return the string.
 * @param {string} string - The string to trim.
 * @param {number} maxLength - The maximum length of the string.
 * @returns string or shortened string
 */
export function trimString(string: string, maxLength: number): string {
    return string.length > maxLength ? string.substr(0, maxLength - 1) : string
}

/**
 * It takes a string and a maximum length, and returns a string that is at most the maximum length, with an ellipsis at the
 * end if the string was longer than the maximum length
 * @param {string} string - The string to trim.
 * @param {number} maxLength - The maximum length of the string.
 * @returns A string with an ellipsis at the end.
 */
export function trimStringWithDotsAtEnd(
    string: string,
    maxLength: number
): string {
    return trimString(string, maxLength) + "&hellip;"
}
