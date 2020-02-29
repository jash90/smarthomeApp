import AsyncStoreUtil from "../stores/asyncStore";
import AsyncStoreKeys from "../stores/asyncStore/AsyncStoreKeys";
import Stores from "../stores/mobxStores";

export default class Initial {
    public static async AppStore() {
        try {
            const rememberEmail = await AsyncStoreUtil.load(
                AsyncStoreKeys.rememberEmail
            );
            const savedEmail = await AsyncStoreUtil.load(
                AsyncStoreKeys.savedEmail
            );
            const firstOpen = await AsyncStoreUtil.load(
                AsyncStoreKeys.firstOpen
            );
            const logged = await AsyncStoreUtil.load(AsyncStoreKeys.logged);
            const user = await AsyncStoreUtil.load(AsyncStoreKeys.user);

            Stores.appStore.setRememberEmail(rememberEmail);
            Stores.appStore.setSavedEmail(savedEmail);
            Stores.appStore.setFirstOpen(firstOpen);
            Stores.appStore.setLogged(logged);
            Stores.authStore.setUser(user);
        } catch (error) {
            console.log(error);
        }
    }
}
