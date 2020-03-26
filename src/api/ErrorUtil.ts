import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-simple-toast";
import HttpStatus from "http-status";
import Stores from "../stores/mobxStores";
import NavigationService from '../navigation/NavigationService';
import { Navigators } from "../navigation/navigators/Enum";
import { AxiosResponse } from 'axios';

export default class ErrorUtil {
    public static async errorService(error: any) {
        const connectionInfo = await NetInfo.fetch();
        const internetConnectionStatus =
            connectionInfo.type !== "none" && connectionInfo.type !== "unknown";
        if (!internetConnectionStatus) {
            Toast.show("Brak połączenia z internetem", Toast.LONG);
        } else if (error.statusCode === HttpStatus.CONFLICT) {
            Toast.show(`Podany email jest już zajęty.`, Toast.LONG);
        } else if (error.statusCode === HttpStatus.FORBIDDEN) {
            Toast.show(`Niepoprawny login lub hasło.`, Toast.LONG);
        } else if (error.statusCode === HttpStatus.UNAUTHORIZED) {
            Toast.show(`Odmowa dostępu`, Toast.LONG);
            if (Stores.appStore.logged) {
                Stores.appStore.setLogged(false);
                Stores.authStore.clearUser();
                NavigationService.reset(Navigators.Auth);
            }
        } else if (error.statusCode === HttpStatus.SERVICE_UNAVAILABLE) {
            Toast.show(
                `Service is unavalible`,
                Toast.LONG
            );
        } else if (error.message) {
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
