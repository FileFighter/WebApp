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