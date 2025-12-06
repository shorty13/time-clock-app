import { Pressable, Text } from 'react-native'
import { useContext } from 'react'
import { cn } from '@/lib/cn'
import { WorkingContext } from '@/context/working-context'

// Button to start or stop the time clock
export const StartButton = () => {
    const { handlePress, isWorking } = useContext(WorkingContext)
    return (
        <Pressable
            onPress={() => handlePress(false)}
            className={cn(
                'will-change-variable rounded-xl py-4 transition-colors duration-100 ease-in-out',
                !isWorking ? "bg-green-600" : 'bg-red-600'
            )}>
            <Text className="text-white text-xl text-center font-bold">
            {!isWorking ? 'Starten' : 'Pause'}
            </Text>
        </Pressable>
    )
}



