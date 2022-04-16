/**
 * @interface
 * @param {number} viewportWidth
 * @param {number} viewportHeight
 */
export interface getWindowSize_Interface {
    viewportWidth: number
    viewportHeight: number
}

/**
 * It returns the width and height of the browser window
 * @returns An object with two properties, viewportHeight and viewportWidth.
 */
export function getWindowSize(): getWindowSize_Interface {
    let viewportwidth: number
    let viewportheight: number

    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight

    if (typeof window.innerWidth != "undefined") {
        viewportwidth = window.innerWidth
        viewportheight = window.innerHeight
    }

    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (
        typeof document.documentElement != "undefined" &&
        typeof document.documentElement.clientWidth != ("undefined" || 0)
    ) {
        viewportwidth = document.documentElement.clientWidth
        viewportheight = document.documentElement.clientHeight
    }

    // older versions of IE
    else {
        viewportwidth = document.getElementsByTagName("body")[0].clientWidth
        viewportheight = document.getElementsByTagName("body")[0].clientHeight
    }
    return {
        viewportHeight: viewportheight,
        viewportWidth: viewportwidth,
    }
}
