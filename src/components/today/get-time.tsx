import { TimeContext, TimeProvider } from '@/context/time-context'
import { WorkingContext } from '@/context/working-context'
import { cn } from '@/lib/cn'
import { convertDateToLocalDateString } from '@/lib/times'
import { useContext } from 'react'
import { Text } from 'react-native'

// Displays either the current date or time depending on the bool

type Props = {
    bool: boolean
    className?: string
}
export const GetTime = ({ 
    bool,
    className,
 }: Props) => {
    const providerProps = useContext(WorkingContext)
    return (
        <TimeProvider {...providerProps}>
            <DisplayTime bool={bool} className={className} />
        </TimeProvider>
    )
}

const DisplayTime = ({ 
    bool, 
    className 
}: Props) => {
    const { date } = useContext(TimeContext)

    const now = convertDateToLocalDateString(date)
    const info = bool ? now[0] : now[1]
    return (
        <Text className={cn('text-white', className)}>
            {info}
        </Text>
    )
}
