import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// tailwind class merger
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}