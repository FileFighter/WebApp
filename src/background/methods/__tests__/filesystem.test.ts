import { getPathWithoutName, removeTrailingBackslash } from "../filesystem"

describe("Filesystem functions", () => {
    test("Getting path without name works", () => {
        let root = getPathWithoutName("/abc", "abc")
        expect(root).toEqual("/")

        let result = getPathWithoutName("/js/file.txt", "file.txt")
        expect(result).toEqual("/js/")
    })

    test("Removing trailing backslashes", () => {
        let result1 = removeTrailingBackslash("/somePath/")
        expect(result1).toEqual("/somePath")

        let root = removeTrailingBackslash("/")
        expect(root).toEqual("/")

        let unchanged = removeTrailingBackslash("/hallo")
        expect(unchanged).toEqual("/hallo")
    })
})
