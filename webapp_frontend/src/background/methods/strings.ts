export function reverseString(string:string):string {
    if (string === "")
        return "";
    else
        return reverseString(string.substr(1)) + string.charAt(0);
}

export function stringReplaceSubstringOneTimeFromBeginningAndEnd(string:string, substring:string, replaceWith:string):string {
    string = string.replace(substring, replaceWith);
    string = reverseString(string);
    string = string.replace(substring, replaceWith);
    string = reverseString(string);
    return string;
}

export function deleteSpaces(string:string):string {
    return string.replace(/\s/,"")
}

export function trimString(string:string, maxLength: number):string {
    return string.length > maxLength ? string.substr(0, maxLength-1) : string;
}

export function trimStringWithDotsAtEnd(string:string, maxLength: number):string {
    return trimString(string, maxLength) + '&hellip;';
}