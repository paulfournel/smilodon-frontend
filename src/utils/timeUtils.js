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
