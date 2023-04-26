import {intervalToDuration} from "date-fns";

export const formatDuration = (durationStr) => {
    const duration = intervalToDuration({start: 0, end: durationStr * 1000})
    const zeroPad = (num) => String(num).padStart(2, '0')
    if(duration.hours>0){
        return `${zeroPad(duration.hours)}:${zeroPad(duration.minutes)}:${zeroPad(duration.seconds)}`
    }else{
        return `${zeroPad(duration.minutes)}:${zeroPad(duration.seconds)}`
    }
}

export function getTimeDifference(published) {
    const diff = (new Date() - new Date(published)) / 1000;
    if (diff < 3600 * 12) {
        const minutes = Math.floor(diff / 60);
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    }
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
}
