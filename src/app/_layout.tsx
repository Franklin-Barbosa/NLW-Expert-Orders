import { SafeAreaView } from "react-native" // judar a evitar que o conteúdo do aplicativo seja sobreposto por barras de status, navegação ou entalhes (notch) em iOS e Android.
import { Slot } from "expo-router"
import { 
    useFonts,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
} from "@expo-google-fonts/inter" // Fontes da aplicação
import { Loading } from "@/components/loanding"

export default function Layout() {
    // carregar fontes para o dispositivo
    const [fontesLoaded] = useFonts({
        useFonts,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold
    })

    // verificar se as fontes foram carregadas
    if (fontesLoaded){
        return <Loading />
    }

    return (
        <SafeAreaView className="bg-slate-900 flex-1">
            {/* Todas as rotas da aplicação passarão pelo Slot */}
            <Slot /> 
        </SafeAreaView>
    )
}
