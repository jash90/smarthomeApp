import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-simple-toast";
import HttpStatus from "http-status";

export default class ErrorUtil {
    public static async errorService(error: any) {
        const connectionInfo = await NetInfo.fetch();
        const internetConnectionStatus =
            connectionInfo.type !== "none" && connectionInfo.type !== "unknown";
        if (!internetConnectionStatus) {
            Toast.show("Brak połączenia z internetem", Toast.LONG);
        } else if (error.response?.status === HttpStatus.CONFLICT) {
            Toast.show(`Podany email jest już zajęty.`, Toast.LONG);
        } else if (error.response?.status === HttpStatus.FORBIDDEN) {
            Toast.show(`Niepoprawny login lub hasło.`, Toast.LONG);
        } else if (error.response?.status === HttpStatus.UNAUTHORIZED) {
            Toast.show(`Odmowa dostępu`, Toast.LONG);
        } else if (error.message) {
            Toast.show(
                error.message,
                Toast.LONG
            );
        }
        else {
            Toast.show(
                `Coś poszło nie tak skontaktuj się z obsługą, bądź administratorem.`,
                Toast.LONG
            );
        }
    }
}
