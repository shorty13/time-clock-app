import { Pressable, Text } from 'react-native'
import { useContext } from 'react'
import { cn } from '@/lib/cn'
import { WorkingContext } from '@/context/working-context'

// Button to start, stop or end the time clock
export const MainButton = ({ end, className }: { end: boolean, className?: string }) => {
    const { handlePress, isWorking, logs } = useContext(WorkingContext)

    const pressableClassName = cn(
        'will-change-variable rounded-xl py-4 transition-colors duration-100 ease-in-out',
        end ? 'bg-blue-600' : !isWorking ? "bg-green-600" : 'bg-red-600', className
    )
    const text = end ? 'Ende' : logs.length === 0 ? 'Starten' : !isWorking  ? 'Weiter' : 'Pause'
    return (
        <Pressable
            disabled={end ? !isWorking : false}
            onPress={() => handlePress(end)}
            className={pressableClassName}    
        >
            <Text className="text-white text-xl text-center font-bold">
            {text}
            </Text>
        </Pressable>
    )
}

