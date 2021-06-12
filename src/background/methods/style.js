export function getStyleValue(element, strCssRule) {
    //https://stackoverflow.com/questions/5227909/how-to-get-an-elements-padding-value-using-javascript
    let strValue = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
        strValue = document.defaultView
            .getComputedStyle(element, "")
            .getPropertyValue(strCssRule);
    } else if (element.currentStyle) {
        strCssRule = strCssRule.replace(/(\w)/g, function (strMatch, p1) {
            return p1.toUpperCase();
        });
        strValue = element.currentStyle[strCssRule];
    }
    return strValue;
}
