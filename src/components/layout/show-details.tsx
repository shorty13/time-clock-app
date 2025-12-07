import { Text, View } from 'react-native'
import React, { useContext } from 'react'
import { LogsObjectProps, WorkingContext } from '@/context/working-context'
import { cn } from '@/lib/cn'
import { TimeContext, TimeProvider } from '@/context/time-context'

// Displays the time worked so far for current day
export const DisplayDetails = ({ placed }: { placed: 'work' | 'break' | 'logs' }) => {
    const { logs, breaksRef, isWorking, timeWorkedRef } = useContext(WorkingContext)

    return (
        <TimeProvider 
            breaksRef={breaksRef} 
            isWorking={isWorking} 
            timeWorkedRef={timeWorkedRef}
            logs={logs}
        >
            <Details logs={logs} placed={placed}  />
        </TimeProvider>
    )
}


const Details = ({ placed, logs }:  { placed: 'work' | 'break' | 'logs', logs:  LogsObjectProps[]}) => {
    const { breaks, timeWorked } = useContext(TimeContext)
    const text = placed === 'work' ? timeWorked : breaks
    const children = (
        <Text 
            style={{ fontFamily: 'RobotoMono-Regular' }} 
            className={cn('text-4xl text-white')}
            >
                <Text className={cn('text-4xl text-white')}>{text}</Text>
        </Text>
    )
     return (
        <View>
            {placed !== 'logs' ? children : logs.map(({ date, status, timeLog}, i) => (
                <Text key={`${date} - ${timeLog} - ${i}`} className="text-neutral-300">{`${status} - ${timeLog}`}</Text>
            ))}
        </View>
     )

}