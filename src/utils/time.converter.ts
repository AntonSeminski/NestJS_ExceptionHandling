/**
 * @param time - formatted time;
 * @description Example: '1s' <br/>
 *Supported  time measures: <br/>
 * s  - second; <br/>
 * m - minute; <br/>
 * h - hour; <br/>
 * d - day; <br/>
 * w - week (7 days).
 */
const addTimeToNow = (time: string): number => {
    if (!time) return 0;

    return Date.now() + timeToMs(time);
}

/**
 * @param time - formatted time;
 * @description Example: '1s' <br/>
 *Supported  time measures: <br/>
 * s  - second; <br/>
 * m - minute; <br/>
 * h - hour; <br/>
 * d - day; <br/>
 * w - week (7 days).
 */
const timeToMs = (time: string): number => {
    if (!time || !time.match(/^\d+[a-z]$/i))
        return 0;

    let milliseconds = 1;
    const value = +time.slice(0, time.length - 1);

    switch (time.slice(-1)) {
        case 's':
            milliseconds *= 1000;
            break;
        case 'm':
            milliseconds *= 1000 * 60;
            break;
        case 'h':
            milliseconds *= 1000 * 60 * 60;
            break;
        case 'd':
            milliseconds *= 1000 * 60 * 60 * 24;
            break;
        case 'w':
            milliseconds *= 1000 * 60 * 60 * 24 *7;
    }

    return milliseconds * value;
}

const isTimeExpired = (expirationTime) => {
    return expirationTime < Date.now();
}

const isTimeExpiredWithCodeDiff= (expirationTime, diffPower) => {
    return expirationTime < (Date.now() / (10 ** diffPower));
}

export {
    timeToMs,
    addTimeToNow,
    isTimeExpired,
    isTimeExpiredWithCodeDiff
};