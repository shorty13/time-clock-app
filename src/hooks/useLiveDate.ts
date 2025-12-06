import { useEffect, useState } from "react"

// hook to create a date object with real time, updates every second
export const useLiveDate = (): Date => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const intervall = setInterval(() => {
            setDate(new Date())
        }, 1000)

        return () => clearInterval(intervall)
    }, [])

    return date
}