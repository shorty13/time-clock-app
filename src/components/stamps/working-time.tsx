import { Text, View } from 'react-native'
import React, { useContext } from 'react'
import { WorkingContext } from '@/context/working-context'

// Displays the time worked so far for current day
const WorkingTimes = () => {
    const { timeWorked } = useContext(WorkingContext)
    return (
        <View>
            <Text className='text-white'>{timeWorked}</Text>
        </View>
    )
}

export default WorkingTimes
