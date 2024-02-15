import { useState } from "react";
import { Text, View, ScrollView, Alert, Linking } from "react-native";
import { useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ProductCartProps, useCardStore } from "@/stores/cart-store";

import { formatCurrency } from "@/utils/functions/format-currency";

import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";

const PHONE_NUMBER = "" // nº do whatsapp no formato: 55+DDD+SEU_NUMERO

export default function Cart() {
    const [address, setAddress] = useState("")
    const cartStore = useCardStore()
    const navigation = useNavigation()

    // calcular produtos na sacola
    const total = formatCurrency(
        cartStore.products.reduce(
            (total, product) => total + product.price * product.quantity, 
            0
        )
    )

    function handleProductRemove(produtc: ProductCartProps) {
        Alert.alert("Remover", `Deseja remover ${produtc.title} do carrinho?`, [
            {
                text: "Cancelar",
            },
            {
                text: "Remover",
                onPress: () => cartStore.remove(produtc.id),
            }
        ])
    }

    // Enviar pedido
    function handleOrder() {
        if(address.trim().length === 0) {
            return Alert.alert("Pedido", "Informe os dados da entrega")
        }

        const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("")

        const message = `
            🍔 NOVO PEDIDO
            \n Entregar em: ${address}

            ${products}
            \n Valor total: ${total}
        `
        Linking.openURL(
            `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`
        ) // enviar mensagem pelo whatsapp

        cartStore.clear() // limpar sacola
        navigation.goBack() // voltar para tela anterior
    }

    return (
        <View className="flex-1 pt-11">
            <Header title="Seu carrinho" />
            
            {/* KeyboardAwareScrollView controla a aparência do teclado e rola automaticamente para o foco TextInput */}
            <KeyboardAwareScrollView>
                <ScrollView>
                    {/* Produtos selecionados */}
                    <View className="p-5 flex-1">
                        {cartStore.products.length > 0 ?(
                            <View className="border-b border-slate-700">
                                {cartStore.products.map((product) => (
                                    <Product 
                                        key={product.id} 
                                        data={product} 
                                        onPress={() => handleProductRemove(product)} 
                                    />
                                ))}
                            </View>
                        ) : (
                            <Text className="font-body text-slate-400 text-center my-8">
                                Seu carrinho está vazio!
                            </Text>
                        )}

                        {/* Total de pedido na sacola */}
                        <View className="flex-row gap-2 items-center mt-5 mb-4">
                            <Text className="text-white text-xl font-subtitle">Total:</Text>
                            <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
                        </View>

                        <Input 
                            placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemeno" 
                            onChangeText={setAddress} 
                            blurOnSubmit={true} // não fazer quebra de linha
                            onSubmitEditing={handleOrder} // enviar pedido ao clicar o enter
                            returnKeyType="next" // alterar botão de enter para next(setinha de enviar)
                        />
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>

            {/* Botão */}
            <View className="p-5 gap-5">
                <Button onPress={handleOrder}>
                    <Button.Text>Enviar pedido</Button.Text>
                    <Button.Icon>
                        <Feather name="arrow-right-circle" size={20} />
                    </Button.Icon>
                </Button>

                <LinkButton title="Voltar ao cardápio" href="/" />
            </View>
        </View>
    )
}