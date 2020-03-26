import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-simple-toast";
import HttpStatus from "http-status";
import Stores from "../stores/mobxStores";
import NavigationService from '../navigation/NavigationService';
import { Navigators } from "../navigation/navigators/Enum";
import StringUtil from "../utils/StringUtil";
export default class ErrorUtil {
    public static async errorService(error: any) {
        console.log({ errorii: error });
        const connectionInfo = await NetInfo.fetch();
        const internetConnectionStatus =
            connectionInfo.type !== "none" && connectionInfo.type !== "unknown";
        if (!internetConnectionStatus) {
            Toast.show("Brak połączenia z internetem", Toast.LONG);
        } else if (error.status === HttpStatus.CONFLICT) {
            Toast.show(`Podany email jest już zajęty.`, Toast.LONG);
        } else if (error.status === HttpStatus.FORBIDDEN) {
            Toast.show(`Niepoprawny login lub hasło.`, Toast.LONG);
        } else if (error.status === HttpStatus.UNAUTHORIZED) {
            Toast.show(`Odmowa dostępu`, Toast.LONG);
            if (Stores.appStore.logged) {
                Stores.appStore.setLogged(false);
                Stores.authStore.clearUser();
                NavigationService.reset(Navigators.Auth);
            }
        } else if (error.status === HttpStatus.SERVICE_UNAVAILABLE) {
            Toast.show(
                `Service is unavalible`,
                Toast.LONG
            );
        } else if (error.status === HttpStatus.BAD_REQUEST) {
            const constraints = error.data.message[0].constraints;
            let message = String(constraints[Object.keys(constraints)[0]]);
            Toast.show(
                `${StringUtil.capitalize(message)}`,
                Toast.LONG
            );
        } else if (error.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            let message = error.data.errors[0].message;
            Toast.show(
                `${StringUtil.capitalize(message)}`,
                Toast.LONG
            );
        }

        else if (error.message) {
            Toast.show(`Error : ${error.message}`, Toast.LONG);
        }
        else {
            Toast.show(
                `Coś poszło nie tak skontaktuj się z obsługą, bądź administratorem.`,
                Toast.LONG
            );
        }
    }
}
