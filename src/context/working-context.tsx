import { useLiveDate } from "@/hooks/useLiveDate"
import { secondsToTime, timeToSeconds } from "@/lib/times"
import { createContext, ReactNode, useMemo, useState } from "react"

type WorkingContexProps = {
    isWorking: boolean
    logs: LogsObjectProps[]
    timeWorked: string
    handlePress: (complete: boolean) => void
}

type LogsObjectProps = {
    status: string
    date: string
    timeLog: string
}

export const WorkingContext = createContext<WorkingContexProps>({
    isWorking: false,
    logs: [],
    timeWorked: '',
    handlePress: () => {}
})

// Context for relevant states -> updates every second cause of the useLiveDate Hook, need better solution

export const WorkingProvider = ({ children }: { children: ReactNode }) => {
    const [isWorking, setIsWorking] = useState(false) // determines if the clock runs or not
    const [isComplete, setIsComplete] = useState(false) // determines if the day is closed or not
    const [logs, setLogs] = useState<LogsObjectProps[]>([]) // contains all logs made during current day
    const [timeWorked, setTimeWorked] = useState('00:00:00') // containes calculated working time
    const now = useLiveDate() // live date hook => updates every second
    
    const dateArray = now.toLocaleDateString('de', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: 'numeric',
    }).split(',') // array contains date and time


    const logsObject = {
        status: !isWorking ? logs.length === 0 ? 'Start' : 'Weiter' : 'Pause',
        date: dateArray[0].trim(),
        timeLog: dateArray[1].trim()
    } // object to save logs

    // will be called when start- or end-button is pressed
    const handlePress = (complete: boolean) => {
        if (isComplete) return // return if day is complete

        // create arrays for calculations
        const newLogs = [...logs, logsObject]
        const start = newLogs.filter((_, i ) => i % 2 !== 0)
        const end = newLogs.filter((_, i ) => i % 2 === 0)
        const times = start.map((startTime, i) => {
            return Math.abs(timeToSeconds(startTime.timeLog) - timeToSeconds(end[i].timeLog))
        })

        // adding all seconds within the array
        const timesReduced = times.reduce((acc, mod) => acc + mod, 0)

        // bool determines which button was presst -> complete ? end-button : start-button
        if (complete) {
            setIsWorking(false)
            setIsComplete(true)
            setLogs(prev => {
                return [...prev, {
                    ...logsObject,
                    status: 'Ende'
                }]
            })
            setTimeWorked(secondsToTime(timesReduced))
            return
        }

        setLogs(newLogs)
        setIsWorking(prev => !prev)
        setTimeWorked(secondsToTime(timesReduced))
    }
    
    const values = useMemo(() =>  ({ 
        isWorking, 
        handlePress,
        timeWorked,
        logs, 
    }), [
        isWorking, 
        handlePress, 
        timeWorked,
        logs,
    ])

    return (
        <WorkingContext.Provider value={values}>
            {children}
        </WorkingContext.Provider>
    )
}