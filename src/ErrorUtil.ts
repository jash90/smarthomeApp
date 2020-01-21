import { AsyncStorage, Platform } from "react-native";
import Toast from "react-native-simple-toast";
import NetInfo from "@react-native-community/netinfo";
import NavigationService from "./NavigationService";
import Scenes from "./Scenes";
import Stores from "./stores";
import axios from "axios";
export default class ErroUtil {
    public static async errorService(error: any) {
        const connectionInfo = await NetInfo.fetch();
        const internetConnectionStatus =
            connectionInfo.type !== "none" && connectionInfo.type !== "unknown";
        if (!internetConnectionStatus) {
            Toast.show("Brak połączenia z internetem", Toast.LONG);
        } else if (error.code === 401) {
            Stores.authStore.clearUser();
            await AsyncStorage.removeItem("User");
            axios.defaults.headers.common["authorization"] = null;
            NavigationService.navigate(Scenes.Login);
            Toast.show(`Brak Autoryzacji zaloguj się ponownie.`, Toast.LONG);
        } else if (error) {
            Toast.show(
                `Coś poszło nie tak skontaktuj się z obsługą, bądź administratorem.`,
                Toast.LONG
            );
        }
    }
}
