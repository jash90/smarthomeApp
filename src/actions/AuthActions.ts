import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { User } from "../models";
import Stores from "../stores";
export default class AuthActions {
    public static async setUser(user: User) {
        Stores.authStore.setUser(user);
        await AsyncStorage.setItem("User", String(user));
    }

    public static async clearUser() {
        Stores.authStore.clearUser();
        await AsyncStorage.removeItem("User");
        axios.defaults.headers.common["Authorization"] = null;
    }
}
