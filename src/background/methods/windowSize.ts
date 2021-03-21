export interface getWindowSize_Interface {
    viewportWidth: number,
    viewportHeight: number
}
export function getWindowSize():getWindowSize_Interface {

    let viewportwidth:number;
    let viewportheight:number;

// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight

    if (typeof window.innerWidth != 'undefined') {
        viewportwidth = window.innerWidth
        viewportheight = window.innerHeight
    }

// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)

    else if (typeof document.documentElement != 'undefined' &&
             typeof document.documentElement.clientWidth != ('undefined' || 0)){
        viewportwidth = document.documentElement.clientWidth
        viewportheight = document.documentElement.clientHeight
    }

// older versions of IE

    else {
        viewportwidth = document.getElementsByTagName('body')[0].clientWidth
        viewportheight = document.getElementsByTagName('body')[0].clientHeight
    }
    return {
        viewportHeight: viewportheight,
        viewportWidth: viewportwidth
    }
}