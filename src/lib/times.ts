
// convert a time string 'hh:mm:ss' to seconds
export const timeToSeconds = (time: string): number => {
    const [h, m, s] = time.split(":").map(Number)
    return h * 3600 + m * 60 + s
}

// convert seconds back to a time string 'hh:mm:ss'
export const secondsToTime = (sec: number): string => {
    const hour = Math.floor(sec / 3600)
    const min = Math.floor((sec % 3600) / 60)
    const seconds = sec & 60
    const pad = (n: number) => n.toString().padStart(2, "0")
    return `${pad(hour)}:${pad(min)}:${pad(seconds)}`
}
