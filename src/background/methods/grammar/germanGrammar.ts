/**
 * It checks if name allows to add an s for its genitive. If not it adds an apostrophe
 * to the end of the name, otherwise it adds an "s"
 * @param {string} name - the name of the item
 * @returns The genitive of the word.
 */
function genitiveOfWord(name: string): string {
    // checks if "s" can be used for name's plural or if an apostrophe has to be used
    let lastLetter = name[name.length - 1]
    let lastTwoLetters = name.substr(name.length - 2, 2).toLowerCase()
    return lastLetter === "s" ||
        lastLetter === "ß" ||
        lastLetter === "z" ||
        lastLetter === "x" ||
        lastTwoLetters === "ce"
        ? name + "'"
        : name + "s"
}

export { genitiveOfWord }
