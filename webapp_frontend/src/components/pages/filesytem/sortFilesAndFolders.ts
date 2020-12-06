import {Folder, PermissionSet} from "../../../background/api/filesystemTypes";

function mergeObjectArraysByProperty(leftArray: any, rightArray: any, propertyName: keyof File | keyof Folder, sortIncreasing: boolean): File[] & Folder[] {
    let arr: any = []
    // Break out of loop if any one of the array gets empty
    while (leftArray.length && rightArray.length) {
        // Pick the smaller among the smallest element of left and right sub arrays

        if (rightArray[0] === undefined || rightArray[0][propertyName] === undefined || !rightArray[0].hasOwnProperty(propertyName)) {
            let help: File | Folder | undefined = leftArray.shift();
            if (help) arr.push(help)
            continue;
        } else if (leftArray[0] === undefined || leftArray[0][propertyName] === undefined || !leftArray[0].hasOwnProperty(propertyName)) {
            let help: (File | Folder) | undefined = rightArray.shift();
            if (help) arr.push(help)
            continue;
        }

        //at this point both elements should have property
        let firstLeftElement: string | number | boolean | PermissionSet | undefined = leftArray[0][propertyName];
        let firstRightElement: string | number | boolean | PermissionSet | undefined = rightArray[0][propertyName];
        if (typeof firstLeftElement === "string") firstLeftElement = firstLeftElement.toLowerCase();
        if (typeof firstRightElement === "string") firstRightElement = firstRightElement.toLowerCase();
        if (
            (firstLeftElement !== undefined && firstRightElement !== undefined && firstLeftElement <= firstRightElement && sortIncreasing)
        ) {
            let help: (File | Folder) | undefined = leftArray.shift();
            if (help) arr.push(help)
        } else {
            let help: (File | Folder) | undefined = rightArray.shift();
            if (help) arr.push(help)
        }
    }

    // Concatenating leftover elements
    return [...arr, ...leftArray, ...rightArray]
}

export function sortObjectsInArrayByProperty(originalArray: any, propertyName: keyof File | keyof Folder, sortIncreasing: boolean): any {
    const array = [...originalArray]
    if (!array || array.length <= 1) return array ?? [];

    const half = array.length / 2
    const left = array.splice(0, half)


    return mergeObjectArraysByProperty(sortObjectsInArrayByProperty(left, propertyName, sortIncreasing), sortObjectsInArrayByProperty(array, propertyName, sortIncreasing), propertyName, sortIncreasing);
}