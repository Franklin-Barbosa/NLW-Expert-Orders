import { Image, View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons" // icones
import colors from "tailwindcss/colors"; // cores

// Tipagem
type HeaderProps = {
    title: string, // recebe um title como string e passa como atributo
    cartQuantityItems?: number, // define a quantidade de items opcional
}

export function Header({ title, cartQuantityItems = 0 }: HeaderProps) {
    return (
        <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
            <View className="flex-1">
                <Image source={require("@/assets/logo.png")} className="h-6 w-32" />
                <Text className="text-white text-xl font-heading mt-2">{ title }</Text>
            </View>

            {
                cartQuantityItems > 0 && (
                    // Tornar o campo(icone) de sacola clicável
                    <TouchableOpacity className="relative" activeOpacity={0.7}>
                        <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
                            <Text className="text-slate-900 font-bold text-xs">
                                { cartQuantityItems }
                            </Text>
                        </View>

                        {/* Icone de sacola de compras */}
                        <Feather name="shopping-bag" color={colors.white} size={24} /> 
                    </TouchableOpacity>
                )
            }
        </View>
    )
}
