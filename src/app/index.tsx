import { CategoryButton } from "@/components/category-button"
import { Header } from "@/components/header"
import { View, Text, FlatList } from "react-native"
import { CATEGORIES } from "@/utils/data/products"
import { useState } from "react"

export default function Home() {
    const [category, setCategory] = useState(CATEGORIES[0])

    function handleCategorySelect(selectedCategory: string) {
        setCategory(selectedCategory)
    }

    return(
        <View className="flex-1 pt-11">
            <Header title="Faça seu pedido" cartQuantityItems={5} />
            
            {/* Botões */}
            <FlatList 
                data={CATEGORIES}
                keyExtractor={( item ) => item}
                renderItem={({ item }) => 
                    < CategoryButton 
                        title={item} 
                        isSelected={item === category} 
                        onPress={() => handleCategorySelect(item)} 
                    />
                }
                horizontal // definir botões horizontalmente
                className="max-h-10 mt-5" // espaçamento superior dos botões
                showsHorizontalScrollIndicator={false} // remover barra so rolar botões
                contentContainerStyle={{gap: 12, paddingHorizontal: 20}} // espaçamento entre os botões e ao lado esquerdo da tela
            />
        </View>
    )
}
