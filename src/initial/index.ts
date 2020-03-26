import AsyncStoreUtil from "../stores/asyncStore";
import AsyncStoreKeys from "../stores/asyncStore/AsyncStoreKeys";
import Stores from "../stores/mobxStores";
import axios from "../api/Axios";
import TypeApi from "../api/TypeApi";
import { Clazz, Serialize } from "../serialize";
import ErrorUtil from "../api/ErrorUtil";
import { AxiosResponse } from "axios";
import TypeActions from "../actions/TypeActions";
import _ from "underscore";
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
            if (logged) {
                await TypeActions.dowloadTypes();
                Stores.authStore.setUser(JSON.parse(user));
                axios.defaults.headers.common["Authorization"] = `Bearer ${
                    JSON.parse(user).token
                    }`;
            }
        }
        catch (error) {
            Stores.appStore.setLogged(false);
            ErrorUtil.errorService(error);

        }
    }
}
