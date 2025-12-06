import { useLiveDate } from '@/hooks/useLiveDate'
import { cn } from '@/lib/cn'
import { Text } from 'react-native'

// Displays either the current date or time depending on the date bool
export const GetTime = ({ 
    date,
    className,
 }: { 
    date: boolean
    className?: string
}) => {
    const now = useLiveDate()
    const dateArray = now.toLocaleDateString(
        'de', {
            day: '2-digit',
            month: 'short',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: 'numeric',
        }
    ).split(',')
    return (
        <Text className={cn('text-white', className)}>
            {date ? dateArray[0] : dateArray[1]}
        </Text>
    )
       
}


