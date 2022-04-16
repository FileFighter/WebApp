/**
 * It takes a number of bytes and returns a string with the number of bytes formatted in a human-readable way
 * @param {number} bytes - The number of bytes to format.
 * @param {number} [decimals=2] - The number of decimals to show.
 * @returns A string with the size of the file in bytes, kilobytes, megabytes, gigabytes, terabytes, petabytes, exabytes,
 * zettabytes, or yottabytes.
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return "0 Bytes"

    const k: number = 1024
    const dm: number = decimals < 0 ? 0 : decimals
    const sizes: string[] = [
        "Bytes",
        "KB",
        "MB",
        "GB",
        "TB",
        "PB",
        "EB",
        "ZB",
        "YB",
    ]

    const i: number = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}
