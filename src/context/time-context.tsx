import {  secondsToTime } from "@/lib/times";
import { createContext, ReactNode, useEffect, useState } from "react";
import { LogsObjectProps } from "./working-context";

type TimeContextProps = {
    timeWorked: string
    breaks: string
    date: Date
}

export const TimeContext = createContext<TimeContextProps>({
    timeWorked: '00:00:00',
    breaks: '00:00:00',
    date: new Date()
})

export const TimeProvider = ({
    children,
    timeWorkedRef,
    breaksRef,
    isWorking,
    logs,
}: {
    children: ReactNode
    timeWorkedRef: { current: number },
    breaksRef: { current: number },
    isWorking: boolean
    logs: LogsObjectProps[]
}) => {
    const [date, setDate] = useState(new Date())
    const [timeWorked, setTimeWorked] = useState('00:00:00') // containes calculated working time
    const [breaks, setBreaks] = useState('00:00:00') // containes calculated break time

    useEffect(() => {
        let currentTrack = isWorking ? timeWorkedRef.current : breaksRef.current
        let setCurrentState = isWorking ? setTimeWorked : setBreaks
        const interval = setInterval(() => {
            currentTrack = logs.length === 0 ? 0 : currentTrack + 1
            const converted = secondsToTime(currentTrack)
            setCurrentState(converted)
            setDate(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [isWorking, logs])

    return (
        <TimeContext.Provider value={{timeWorked, breaks, date}}>
            {children}
        </TimeContext.Provider>
    )
}