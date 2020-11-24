import {toast} from "react-toastify";

export function notMinStrLength(text:string, minAnz:number):boolean {
    return text.length < minAnz;
}

export function notMinStrLengthAlert(minAnz:number|string, where:number|string):void {
    toast.error(
        "Mindestzeichenanzahl bei " +
        where +
        ": " +
        minAnz
    );
}

export function passwordsDoNotMatchAlert():void {
    toast.error("Passwörter stimmen nicht überein");
}

export function biggerMaxStrLength(text:string, maxAnz: number):boolean {
    return text.length > maxAnz;
}