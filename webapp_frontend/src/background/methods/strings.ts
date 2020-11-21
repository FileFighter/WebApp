function reverseString(string:string):string {
    if (string === "")
        return "";
    else
        return reverseString(string.substr(1)) + string.charAt(0);
}

function stringReplaceSubstringOneTimeFromBeginningAndEnd(string:string, substring:string, replaceWith:string):string {
    string = string.replace(substring, replaceWith);
    string = reverseString(string);
    string = string.replace(substring, replaceWith);
    string = reverseString(string);
    return string;
}

function deleteSpaces(string:string):string {
    return string.replace(/\s/,"")
}

export {reverseString, stringReplaceSubstringOneTimeFromBeginningAndEnd, deleteSpaces}