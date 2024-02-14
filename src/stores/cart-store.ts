import { ProductProps } from "@/utils/data/products"
import { create } from "zustand"
import * as cartInMemory from "./helpers/cart-in-memory"

export type ProductCartProps = ProductProps & {
    quantity: number
} 

type StataProps = {
    products: ProductCartProps[]
    add: ( product: ProductProps) => void
}

export const useCardStore = create<StataProps>((set) => ({
    // lista de produtos
    products: [],

    // adicionar produto na sacola
    add: ( product: ProductProps ) => 
        set((state) => ({
            // retornar produtos atualizado
            products: cartInMemory.add(state.products, product),
        })),
}))
