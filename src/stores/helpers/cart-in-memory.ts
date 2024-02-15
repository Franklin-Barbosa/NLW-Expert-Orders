import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cart-store";

// Adicionar produto na sacola
export function add(products: ProductCartProps[], newProduct: ProductProps) {
    const existingProduct = products.find(({ id }) => newProduct.id === id)

    // Se o produto já existe na sacola
    if(existingProduct) {
        
        return products.map((product) => 
            product.id === existingProduct.id 
                ? {...product, quantity: product.quantity + 1}
                : product
        )
    }

    // Se o produto não existe
    return [...products, {...newProduct, quantity: 1}]
}

// Remover produto da sacola
export function remove(products: ProductCartProps[], productRemoveId: string) {
    const updateProducts = products.map((product) => 
        product.id === productRemoveId 
            ? {
                ...product,
                quantity: product.quantity > 1 ? product.quantity -1 : 0
              } 
            : product
    )

    return updateProducts.filter((product) => product.quantity > 0)
}