import AppStore from "./AppStore";
import AuthStore from "./AuthStore";
import PropsStore from "./PropsStore";

export default {
    authStore: new AuthStore(),
    propsStore: new PropsStore(),
    appStore: new AppStore()
};
