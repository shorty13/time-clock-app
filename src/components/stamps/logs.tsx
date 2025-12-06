import { WorkingContext } from "@/context/working-context"
import { useContext } from "react"
import { Text, View } from "react-native"

// List to render all logs made during the day
export const Logs = () => {
    const { logs } = useContext(WorkingContext)
    return (
        <View className="space-y-2">
            {logs.map(({ date, status, timeLog}, i) => (
                <Text key={`${date} - ${timeLog} - ${i}`} className="text-neutral-300">{`${status} - ${timeLog}`}</Text>
            ))}
        </View>
    )
}