/**
 * Given a cookie name, return the value of the cookie
 * @param cname - The name of the cookie to retrieve.
 * @returns {string} The value of the cookie.
 */
export function getCookie(cname: string) {
    let name = cname + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(";")
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === " ") {
            c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}

/**
 * Set a cookie with a value and an expiration date
 * @param {string} cname - The name of the cookie.
 * @param {string} cValue - The value of the cookie.
 * @param {number} exDays - The number of days the cookie will be valid.
 */
export function setCookie(cname: string, cValue: string, exDays: number) {
    let d = new Date()
    d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000)
    let expires = "expires=" + d.toUTCString()
    document.cookie = cname + "=" + cValue + ";" + expires + ";path=/"
}

export function deleteCookie(cname: string) {
    document.cookie =
        cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}
