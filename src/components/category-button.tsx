import { Text, Pressable, PressableProps } from "react-native"
import { clsx } from "clsx"

// Tipagem
type CategoryProps = PressableProps & {
    title: string
    isSelected?: boolean
}

export function CategoryButton({ title, isSelected, ...rest }: CategoryProps) {
    return (
        <Pressable 
            className={clsx(
                "bg-slate-800 px-4 items-center justify-center rounded-md h-10",
                isSelected && "border-2 border-lime-300"
                )} 
            {...rest} // passar todas as propriedades não passadas manualmente
            >
            {/* titulo da categoria */}
            <Text className="text-slate-100 font-subtitle text-sm">{ title }</Text> 
        </Pressable>
    )
}