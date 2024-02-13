import { ActivityIndicator, View } from "react-native";
import colos from "tailwindcss/colors"

// indicar que as fontes estão carregando
export function Loading() {
    return (
        <View className="flex-1 items-center justify-center bg-slate-900">
            <ActivityIndicator color={colos.white} /> 
        </View>
    )
}
