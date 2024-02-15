import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { ProductProps } from "@/utils/data/products"
import * as cartInMemory from "./helpers/cart-in-memory"

export type ProductCartProps = ProductProps & {
    quantity: number
} 

// Tipagem
type StataProps = {
    products: ProductCartProps[]
    add: ( product: ProductProps) => void
    remove: ( productId: string ) => void
    clear: () => void
}

export const useCardStore = create(
    persist<StataProps>((set) => ({
    // lista de produtos
    products: [],

    // adicionar produto na sacola
    add: ( product: ProductProps ) => 
        set((state) => ({
            // retornar produtos atualizado
            products: cartInMemory.add(state.products, product),
        })),

    // adicionar produto da sacola
    remove: ( productId: string ) => 
        set((state) => ({
            products: cartInMemory.remove(state.products, productId),
        })),

    // limpar sacola
    clear: () => set(() => ({products: []}))
}), 
// persistir informações no dispositivo
{
    name: "nlw-expert:cart",
    storage: createJSONStorage(() => AsyncStorage)
}))
