/**
 * Get the value of a CSS property of an element
 * (SO-copy [stackoverflow.com](https://stackoverflow.com/questions/5227909/how-to-get-an-elements-padding-value-using-javascript))
 * @param element - The element to get the style from.
 * @param strCssRule - The CSS rule you want to get the value of.
 * @returns The value of the css property.
 */
export function getStyleValue(element, strCssRule) {
    //https://stackoverflow.com/questions/5227909/how-to-get-an-elements-padding-value-using-javascript
    let strValue = ""
    if (document.defaultView && document.defaultView.getComputedStyle) {
        strValue = document.defaultView
            .getComputedStyle(element, "")
            .getPropertyValue(strCssRule)
    } else if (element.currentStyle) {
        strCssRule = strCssRule.replace(/(\w)/g, function (strMatch, p1) {
            return p1.toUpperCase()
        })
        strValue = element.currentStyle[strCssRule]
    }
    return strValue
}
