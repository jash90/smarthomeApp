import { Platform } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Toast from "react-native-simple-toast";
import NetInfo from "@react-native-community/netinfo";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
import Stores from "../stores";
import axios from "axios";
import { User } from "../models";
export default class AuthActions {
    public static async setUser(user: User) {
        Stores.authStore.setUser(user);
        await AsyncStorage.setItem("User",String(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    }

    public static async clearUser() {
        Stores.authStore.clearUser();
        await AsyncStorage.removeItem("User");
        axios.defaults.headers.common["Authorization"] = null;
    }
}
