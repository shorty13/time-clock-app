import { ReactNode } from "react"
import { View, Text } from "react-native"
import { cn } from "../../lib/cn"

type SectionProps = {
    title?: string
    children: ReactNode
    className?: string
}

export const Section = ({ title, children, className = "" }: SectionProps) => {
    return (
    <View className={cn('mt-6', className)}>
      {title && (
        <Text className="text-neutral-300 text-sm font-semibold mb-2">
          {title}
        </Text>
      )}
      <View className="bg-neutral-800 rounded-xl p-4">
        {children}
      </View>
    </View>
  )
}