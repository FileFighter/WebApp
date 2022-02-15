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
