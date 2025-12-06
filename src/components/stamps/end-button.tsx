import { Pressable, Text } from 'react-native'
import { useContext } from 'react'
import { WorkingContext } from '@/context/working-context'

// Button to stop the time-clock and close the day
export const EndButton = () => {
    const { handlePress } = useContext(WorkingContext)
    return (
        <Pressable
            onPress={() => handlePress(true)}
            className={'bg-blue-600 rounded-xl py-4'}>
            <Text className="text-white text-xl text-center font-bold">
                Ende
            </Text>
        </Pressable>
    )
}



