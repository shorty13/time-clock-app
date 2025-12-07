import { convertDateToLocalDateString, timeToSeconds } from "@/lib/times"
import { createContext, ReactNode, RefObject, useCallback, useMemo, useRef, useState } from "react"

type WorkingContexProps = {
    isWorking: boolean
    logs: LogsObjectProps[]
    timeWorkedRef: RefObject<number>
    breaksRef: RefObject<number>
    handlePress: (complete: boolean) => void
}

export type LogsObjectProps = {
    status: 'Start' | 'Weiter' | 'Pause' | 'Ende'
    date: string
    timeLog: string
}

export const WorkingContext = createContext<WorkingContexProps>({
    isWorking: false,
    logs: [],
    timeWorkedRef: { current: 0 },
    breaksRef: { current: 0 },
    handlePress: () => {}
})

// Context for relevant states 
export const WorkingProvider = ({ children }: { children: ReactNode }) => {
    const [isWorking, setIsWorking] = useState(false) // shows if the clock is running or not
    const [logs, setLogs] = useState<LogsObjectProps[]>([]) // contains all logs made during current day
    const timeWorkedRef = useRef(0)// containes calculated working time
    const breaksRef = useRef(0) // containes calculated break time

    const mapTimeArrays = useCallback((array1: LogsObjectProps[], array2: LogsObjectProps[]) => {
        return (
            array1.length !== 0 ? (
                array1.map(({ timeLog }, i) => {
                    const sec1 = timeToSeconds(timeLog)
                    const sec2 = timeToSeconds(array1.length === array2.length ? 
                        array2[i].timeLog : array2.slice(0, array1.length)[i].timeLog
                    )
                    return Math.abs(sec1 - sec2)
                })
            ) : [0]
        )
    }, [])
    
    // will be called when start- or end-button is pressed
    const handlePress = useCallback((complete: boolean) => {
        if (complete && !isWorking) return

        const dateArray = convertDateToLocalDateString(new Date()) // array contains date and time
        const logsObject: LogsObjectProps = {
            status: logs.length === 0 ? 'Start' : !isWorking ? 'Weiter' : complete ? 'Ende' : 'Pause',
            date: dateArray[0].trim(),
            timeLog: dateArray[1].trim()
        } // object to save logs

        // create arrays for calculations
        const newLogs = [...logs, logsObject]
        const startWorking = newLogs.filter((_, i ) => i % 2 === 0)
        const startBreak = newLogs.filter((_, i ) => i % 2 !== 0)
        const endBreak = newLogs.filter((_, i) => i % 2 === 0 && i !== 0)
        const timesWorked = mapTimeArrays(startBreak, startWorking)
        const breaks =  mapTimeArrays(endBreak, startBreak)

        // adding all seconds within the arrays
        const timesWorked_Reduced = timesWorked.reduce((acc, mod) => acc + mod, 0)
        const breaks_Reduced = breaks.reduce((acc, mod) => acc + mod, 0)

        setLogs(newLogs)
        setIsWorking(prev => complete ? false : !prev)
        timeWorkedRef.current = timesWorked_Reduced
        breaksRef.current = breaks_Reduced
    }, [isWorking, logs, timeWorkedRef.current, breaksRef.current, ])

    const values = useMemo(() => ({ 
        isWorking,  handlePress, timeWorkedRef, breaksRef, logs, 
    }), [ 
        isWorking,  handlePress, logs,
    ])

    return (
        <WorkingContext.Provider value={values}>
            {children}
        </WorkingContext.Provider>
    )
}