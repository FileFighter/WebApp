import {toast} from "react-toastify";

function notMinStrLength(text:string, minAnz:number):boolean {
    return text.length < minAnz;
}

function notMinStrLengthAlert(minAnz:number|string, where:number|string):void {
    toast.error(
        "Mindestzeichenanzahl bei " +
        where +
        ": " +
        minAnz
    );
}

function passwordsDoNotMatchAlert():void {
    toast.error("Passwörter stimmen nicht überein");
}

export {notMinStrLength, notMinStrLengthAlert, passwordsDoNotMatchAlert};