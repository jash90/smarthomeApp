import axios from "axios";
import AsyncStoreKeys from "../stores/asyncStore/AsyncStoreKeys";
import AsyncStore from "../stores/asyncStore/index";
import Stores from "../stores/mobxStores";
import { User } from "../stores/models";

export default class AuthActions {
    public static async setUser(user: User) {
        Stores.authStore.setUser(user);
        await AsyncStore.save(AsyncStoreKeys.user, String(user));
        Stores.appStore.setLogged(true);
    }

    public static async clearUser() {
        Stores.authStore.clearUser();
        await AsyncStore.remove(AsyncStoreKeys.user);
        axios.defaults.headers.common["Authorization"] = null;
        Stores.appStore.setLogged(false);
    }
}
