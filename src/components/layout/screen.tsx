import { ReactNode } from "react"
import { ScrollView, View } from "react-native"
import { cn } from "../../lib/cn"

type ScreenProps = {
    children: ReactNode
    scroll?: boolean
    className?: string
}

export const Screen = ({ children, scroll = false, className = "" }: ScreenProps) => {
    const _className = cn('flex-1 bg-neutral-900 px-4 pt-4', className)
    if (scroll) {
        return (
            <ScrollView
                className={_className}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {children}
            </ScrollView>
        )
    }
    return (
        <View className={_className}>
            {children}
        </View>
    )
}