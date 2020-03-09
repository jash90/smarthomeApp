import axios from "axios";
import AsyncStoreKeys from "../stores/asyncStore/AsyncStoreKeys";
import AsyncStore from "../stores/asyncStore/index";
import Stores from "../stores/mobxStores";
import {User} from "../stores/models";

export default class AuthActions {
    public static async setUser(user: User) {
        Stores.authStore.setUser(user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
        await AsyncStore.save(AsyncStoreKeys.user, JSON.stringify(user));
        await AsyncStore.save(AsyncStoreKeys.savedEmail, user.email);
        await AsyncStore.save(AsyncStoreKeys.logged, true);
        if (Stores.appStore.rememberEmail) {
            Stores.appStore.setSavedEmail(user.email);
            await AsyncStore.save(AsyncStoreKeys.savedEmail, user.email);
        }
    }

    public static async clearUser() {
        Stores.authStore.clearUser();
        await AsyncStore.remove(AsyncStoreKeys.user);
        axios.defaults.headers.common["Authorization"] = null;
        Stores.appStore.setLogged(false);
    }
}
