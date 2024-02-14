import { CategoryButton } from "@/components/category-button"
import { Header } from "@/components/header"
import { View, Text, FlatList, SectionList } from "react-native"
import { CATEGORIES, MENU } from "@/utils/data/products"
import { useState, useRef } from "react"
import { Product } from "@/components/product"
import { Link } from "expo-router"
import { useCardStore } from "@/stores/cart-store"

export default function Home() {
    const cartStore = useCardStore()
    const [category, setCategory] = useState(CATEGORIES[0])

    const selectListRef = useRef<SectionList>(null)

    const cartQuantityItems = cartStore.products.reduce((total, Product) => total + Product.quantity, 0)

    function handleCategorySelect(selectedCategory: string) {
        setCategory(selectedCategory)

        const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory)

        if (selectListRef.current) {
            selectListRef.current.scrollToLocation({
                animated: true,
                sectionIndex,
                itemIndex: 0,
            })
        }
    }

    return(
        <View className="flex-1 pt-11">
            {/* Sacola de compras/pedidos */}
            <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItems} />
            
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

            <SectionList 
                ref={selectListRef}
                sections={MENU}
                keyExtractor={(item) => item.id}
                stickySectionHeadersEnabled={false} // evitar esticamento ou sessões sobrepostas
                renderItem={({ item }) => ( 
                    <Link href={`/product/${item.id}`} asChild >
                        <Product data={item} />
                    </Link> 
                )} // renderizar itens da lista
                renderSectionHeader={({section: {title}}) => (
                    <Text className="text-xl text-white font-heading mt-8 mb-2">
                        {title}
                    </Text>
                )} // renderizar sessões
                className="flex-1 p-5"
                showsVerticalScrollIndicator={false} // desabilitando barra de rolagen vertical
                contentContainerStyle={{ paddingBottom: 100 }} // espaçamento no fim da lista
            />
        </View>
    )
}
