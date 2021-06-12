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

// 1 day 20 hours 29 minutes, 10 seconds
function getDurationAsString(duration: number): string {
    // props to https://stackoverflow.com/questions/36098913/convert-seconds-to-days-hours-minutes-and-seconds
    let d = Math.floor(duration / (3600 * 24));
    let h = Math.floor((duration % (3600 * 24)) / 3600);
    let m = Math.floor((duration % 3600) / 60);
    let s = Math.floor(duration % 60);

    let dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    let hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

export {
    getTimeStamp,
    getDateAsStringFromTimestamp,
    getTimeStampFromDate,
    getDurationAsString
};
