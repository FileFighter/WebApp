function getTimeStamp(): number {
    return Math.round(new Date().getTime() / 1000);
}

function getTimeStampFromDate(date: Date): number {
    return Math.round(new Date(date).getTime() / 1000);
}

function getDateAsStringFromTimestamp(ts: number): string {
    let dateFromTs = new Date(ts * 1000);
    let year = dateFromTs.getFullYear();
    let month = dateFromTs.getMonth() + 1;
    let date = dateFromTs.getDate();
    return date + "." + month + "." + year;
}

export {getTimeStamp, getDateAsStringFromTimestamp, getTimeStampFromDate};