import axios from "axios";
import AsyncStoreKeys from "../stores/asyncStore/AsyncStoreKeys";
import AsyncStore from "../stores/asyncStore/index";
import Stores from "../stores/mobxStores";
import { User } from "../stores/models";

export default class TypeActions {
    public static getIcon(id: number) {
        return Stores.appStore.types.find(type => type.id == id)?.icon;
    }

    public static getMin(id: number) {
        return Stores.appStore.types.find(type => type.id == id)?.min;
    }

    public static getMax(id: number) {
        return Stores.appStore.types.find(type => type.id == id)?.max;
    }

    public static getGroup(id: number) {
        return Stores.appStore.types.find(type => type.id == id)?.group;
    }
}
