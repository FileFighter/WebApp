import { FsEntity } from "background/api/filesystemTypes"
import {
    getPathWithoutName,
    removeLeadingBackslash,
    removeTrailingBackslash,
    isFsEntityInFolder,
    getFileExtension,
} from "../filesystem"

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

    test("Removing leading backslashes", () => {
        let result1 = removeLeadingBackslash("/somePath/")
        expect(result1).toEqual("somePath/")

        let root = removeTrailingBackslash("/")
        expect(root).toEqual("/")

        let unchanged = removeTrailingBackslash("hallo")
        expect(unchanged).toEqual("hallo")
    })

    test("Is inode in the given folder works", () => {
        let fsEntity = { path: "/someFile", name: "someFile" } as FsEntity
        let result1 = isFsEntityInFolder(fsEntity, "/")
        expect(result1).toEqual(true)

        let fsEntity1 = {
            path: "/someFolder/someFile",
            name: "someFile",
        } as FsEntity
        let result2 = isFsEntityInFolder(fsEntity1, "/someFolder")
        expect(result2).toEqual(true)
    })

    test("Get file extension works", () => {
        expect(getFileExtension("file.txt")).toEqual("txt")
        expect(getFileExtension("noext")).toEqual("")
        expect(getFileExtension("some.txt.gz.tar.pdf")).toEqual("pdf")
    })
})
