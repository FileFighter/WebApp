//see: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

import sha256 from "./sha256"

const salt = "FileFighterWithSomeSalt"

/**
 * Hashes a password using the SHA-256 algorithm.
 * @param password - The password to hash.
 * @returns The hash of the password.
 * @example
 * // returns 7B1A454E41944B1FD6EB9AC7B1CA6998C4D9263650D257B9B54D0A8FA8A2EFD5
 * let hashedPassword = await hashPassword("Here1AmHere1Remain.");
 *
 */
async function hashPassword(password: string) {
    if (!crypto.subtle) {
        return sha256(password + salt)?.toUpperCase()
    }

    const msgUint8 = new TextEncoder().encode(password + salt) // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8) // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("") // convert bytes to hex string
    return hashHex.toUpperCase()
}

export { hashPassword }
